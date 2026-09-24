// Acceptance probe: with ONLY the anon key, every table must be readable and no table writable.
// If SUPABASE_DB_URL is also present, confirms RLS is enabled on all four tables via pg_class.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anonKey) {
  console.error('EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
const tables = ['categories', 'confessions', 'scriptures', 'confession_categories'];
let failures = 0;
const ok = (label, pass, detail = '') => {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? '  — ' + detail : ''}`);
  if (!pass) failures += 1;
};

// Reads
for (const table of tables) {
  const { data, error } = await supabase.from(table).select('*');
  ok(`anon can SELECT ${table}`, !error, error ? error.message : `${data.length} rows`);
}

const { data: ordered } = await supabase.from('categories').select('name, sort_order').order('sort_order');
const inOrder = ordered?.every((row, i) => row.sort_order === i + 1) ?? false;
ok('categories are sort_order 1..14', inOrder && ordered?.length === 14, `${ordered?.length ?? 0} rows`);

// Writes — every one of these must be rejected.
const expectDenied = (label, result) => {
  const denied = !!result.error;
  const code = result.error?.code ?? '';
  ok(`anon cannot ${label}`, denied, denied ? `rejected (${code}) ${result.error.message}` : 'WRITE SUCCEEDED');
};
expectDenied('INSERT categories', await supabase.from('categories').insert({ name: 'x', slug: 'x-probe', sort_order: 99 }).select());
// Aim write attempts at a row the anon key can actually see (published), so a
// rejection proves the policy blocks writes rather than just hiding the row.
const PROBE_SORT = 6;
const PROBE_TITLE = 'God Gave Me Power';
expectDenied('UPDATE confessions', await supabase.from('confessions').update({ title: 'tampered' }).eq('sort_order', PROBE_SORT).select());
expectDenied('DELETE confessions', await supabase.from('confessions').delete().eq('sort_order', PROBE_SORT).select());
expectDenied('INSERT scriptures', await supabase.from('scriptures').insert({ confession_id: '00000000-0000-4000-8000-000000000001', reference: 'x', sort_order: 9 }).select());
expectDenied('DELETE confession_categories', await supabase.from('confession_categories').delete().neq('category_id', '00000000-0000-0000-0000-000000000000').select());

// Confirm the seed survived the write attempts.
const { data: after } = await supabase.from('confessions').select('title').eq('sort_order', PROBE_SORT).maybeSingle();
ok('published row intact after write attempts', after?.title === PROBE_TITLE, after?.title ?? 'missing');

// RLS flag check (needs a direct DB connection; skipped otherwise).
if (process.env.SUPABASE_DB_URL) {
  const { default: postgres } = await import('postgres');
  const sql = postgres(process.env.SUPABASE_DB_URL, { max: 1, prepare: false });
  try {
    const rows = await sql`
      select relname, relrowsecurity from pg_class
      where relnamespace = 'public'::regnamespace and relname = any(${tables})
      order by relname`;
    for (const t of tables) {
      const row = rows.find((r) => r.relname === t);
      ok(`RLS enabled on ${t}`, row?.relrowsecurity === true);
    }
  } finally {
    await sql.end();
  }
} else {
  console.log('SKIP  RLS flag check (set SUPABASE_DB_URL to verify relrowsecurity directly)');
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
