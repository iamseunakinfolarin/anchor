# Anchor

Scripture-based confessions, browsable by category. Phase 1: catalog browsing backed by Supabase. Audio playback arrives in a later phase.

## Stack

- Expo SDK 57, React Native, TypeScript (strict), expo-router
- Supabase (Postgres) via `@supabase/supabase-js`, anon key only, Row Level Security read-only

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key. `.env` is gitignored.
3. Apply the schema and seed data, either:
   - `npm run db:apply` (requires `SUPABASE_DB_URL` in `.env`), or
   - paste `db/migrations/0001_schema.sql`, `db/migrations/0002_rls.sql`, then `db/seeds/0001_seed.sql` into the Supabase SQL editor in that order.
4. Since Phase 2a the app needs a development build (native audio module) — Expo Go no longer works:
   - Install the dev build APK on your Android phone (build one with `npx eas-cli build --platform android --profile development`).
   - Run `npx expo start` and open the Anchor dev build; it connects to the dev server like Expo Go did.

Audio engine is **expo-audio** (not react-native-track-player). Launch platform is Android; iOS is deferred.

## Checks

| Command | What it does |
|---|---|
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint` | `expo lint` |
| `npm run db:verify` | With only the anon key: reads all four tables, confirms writes are rejected |

## Layout

```
app/            expo-router screens: index, category/[id], confession/[id]
components/     CategoryRow, ConfessionRow, ScriptureList, PlayButton, ScreenState
lib/            env, supabase client, queries, types, theme, helpers
db/migrations/  schema and RLS
db/seeds/       categories, sample confessions, scriptures
```

All categories, confessions and scriptures are read live from Supabase; none are hardcoded in the app.
