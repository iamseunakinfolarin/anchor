# Anchor — project notes for Claude

Scripture-based confessions app. Expo SDK 57, React Native, TypeScript strict, expo-router, Supabase.

## Non-negotiables

- **Audio engine: expo-audio.** Never add or suggest react-native-track-player.
- **Launch platform: Android.** iOS is deferred; build and test Android only for now.
- **Dev builds, not Expo Go**, since Phase 2a (native audio module). `eas.json` "development" profile builds an internal-distribution APK with the dev client.
- New Architecture stays enabled (SDK 57 default).
- Secrets live in the gitignored `.env`; the app ships only the `EXPO_PUBLIC_*` anon key. `SUPABASE_DB_URL` is for local tooling (`npm run db:apply`) only.
- RLS is anonymous SELECT-only on all four tables; the Phase 1 policies in `db/migrations/0002_rls.sql` must not change.
- Catalog data (categories, confessions, scriptures) is read from Supabase, never hardcoded in app code.
- **All color and type come from `lib/theme.ts`.** No inline hex values in components. Tokens: ink, paper, beacon, stone, hairline. Beacon is the single accent and appears only on playing state, the Today marker, and saved-filled state.
- Fraunces (serif) for confession titles and scripture references; Inter (sans) for labels, durations and navigation. Sentence case throughout, no all-caps.
- Layout: single column, generous vertical spacing, hairline dividers. No shadows, no rounded-pill cards, no gradients except the app icon.
- In-app logo is `<AnchorMark />` (react-native-svg, takes a `color` prop). Never use the PNG assets for in-app UI; they are for the icon and splash only.

## Background audio

The expo-audio config plugin in app.json (`enableBackgroundPlayback: true`, `recordAudioAndroid: false`) adds the Android foreground media service and permissions. `lib/audioSession.ts` sets `shouldPlayInBackground` + `interruptionMode: 'doNotMix'` (required for lock-screen controls). `components/Player.tsx` calls `setActiveForLockScreen` on first play — without it Android kills background audio after ~3 minutes.

## Layout

- `app/` routes: index (Home: mark, Today, categories), `category/[id]`, `confession/[id]` (player)
- `components/`: `AnchorMark`, `CategoryMedallion`, `ListRow` + `RowDivider`, `TodayCard`, `Player`, `ScriptureList`, `ScreenState`
- `lib/`: supabase client, queries, types, theme tokens, audio session
- `ListRow` is the shared row pattern; Phase 3's Search and Saved screens reuse it.
- The confession/player screen's visual polish is deferred until after Phase 2b.
- `db/`: migrations, seeds (idempotent), `apply.mjs`, `verify-rls.mjs`

## Checks

`npm run typecheck` · `npm run lint` · `npm run db:verify`
