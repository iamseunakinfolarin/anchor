// Dev-only: applies db/migrations/*.sql then db/seeds/*.sql in filename order.
// Needs SUPABASE_DB_URL in .env (never EXPO_PUBLIC_, so it never ships with the app).
import 'dotenv/config';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postgres from 'postgres';

const here = dirname(fileURLToPath(import.meta.url));
const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('SUPABASE_DB_URL is not set. Add it to .env (see .env.example) or paste the SQL files into the Supabase SQL editor.');
  process.exit(1);
}

const listSql = (dir) =>
  readdirSync(join(here, dir))
    .filter((f) => f.endsWith('.sql'))
    .sort()
    .map((f) => join(here, dir, f));

const files = [...listSql('migrations'), ...listSql('seeds')];
const sql = postgres(url, { max: 1, prepare: false, onnotice: () => {} });

try {
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    await sql.unsafe(text);
    console.log('applied', file.replace(here + '/', 'db/'));
  }
  const [counts] = await sql`
    select (select count(*) from public.categories)::int            as categories,
           (select count(*) from public.confessions)::int           as confessions,
           (select count(*) from public.scriptures)::int            as scriptures,
           (select count(*) from public.confession_categories)::int as links`;
  console.log('row counts', counts);
} finally {
  await sql.end();
}
