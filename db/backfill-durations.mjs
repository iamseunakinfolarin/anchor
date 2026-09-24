// Local-only: fills confessions.duration_seconds from the real audio files.
// Connects with SUPABASE_DB_URL from the gitignored .env (never shipped).
// Only touches published confessions that have an audio_url and no duration;
// safe to re-run, since filled rows are skipped.
import 'dotenv/config';
import { parseBuffer } from 'music-metadata';
import postgres from 'postgres';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('SUPABASE_DB_URL is not set in .env');
  process.exit(1);
}

const sql = postgres(url, { max: 1, prepare: false, onnotice: () => {} });
let failures = 0;

try {
  const rows = await sql`
    select id, title, audio_url
    from public.confessions
    where is_published and audio_url is not null and duration_seconds is null
    order by sort_order`;

  if (rows.length === 0) console.log('Nothing to backfill: every published confession with audio has a duration.');

  for (const row of rows) {
    try {
      const res = await fetch(row.audio_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = new Uint8Array(await res.arrayBuffer());
      // duration: true makes music-metadata scan the whole file, which is
      // accurate for variable-bitrate MP3s rather than estimating from a header.
      const meta = await parseBuffer(buffer, { mimeType: res.headers.get('content-type') ?? 'audio/mpeg' }, { duration: true });
      const seconds = meta.format.duration;
      if (!seconds || !Number.isFinite(seconds)) throw new Error('no duration in file');
      const whole = Math.round(seconds);
      await sql`update public.confessions set duration_seconds = ${whole} where id = ${row.id}`;
      const m = Math.floor(whole / 60), s = String(whole % 60).padStart(2, '0');
      console.log(`UPDATED  ${row.title.padEnd(34)} ${whole}s (${m}:${s})  [exact ${seconds.toFixed(2)}s]`);
    } catch (err) {
      failures += 1;
      console.error(`FAILED   ${row.title}: ${err.message}`);
    }
  }
} finally {
  await sql.end();
}

process.exit(failures === 0 ? 0 : 1);
