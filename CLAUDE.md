# Anchor — project notes for Claude

Android-first Expo app for discovering and playing spoken Scripture confessions.
Expo SDK 57, React Native, TypeScript strict, expo-router, Supabase.

## Core promise

A user can discover a confession and play it. Nothing may break that.

## Design (Stitch system — replaces all previous design rules)

- Source of truth: `/design-reference` (Stitch export + screenshots). Match it. Translate its HTML/Tailwind into React Native; never paste web code.
- All colors, radii, spacing, type and shadows come from `lib/theme.ts`. No inline values.
- Primary `#b7131a` is the only accent. Background `#f7f9ff`, cards `#ffffff`.
- Font: Plus Jakarta Sans only.
- Radius scale: 16 / 32 / 48 / full.
- Two shadow families: neutral elevation (rgba 43,47,51) for surfaces; primary-red glow (rgba 183,19,26) for interactive and playing elements. Use React Native `boxShadow`.
- Cover art: bundled textures in `/assets/covers`, assigned deterministically by id. No faces, no stock photos.
- Bottom navigation is fixed on every screen: Home, Categories, Saved, Settings.

## Product truth

- One voice for all audio, credited "Daily Anchor". No narrator names, hosts, episodes or seasons.
- No fabricated data. Counts, durations and totals come from real data; hide a value rather than fake it.
- No non-functional controls. Every visible button does something.
- Scripture text: KJV or WEB only.
- No accounts, no profile, no notifications in v1. Personal data lives on-device (AsyncStorage).
- Category label is always "Scripture Meditations • N Declarations" with the real count.
- Playlists follow category `sort_order`. Shuffle is session-only. No manual reordering.

## Audio and data

- expo-audio for playback. Never add or suggest react-native-track-player.
- Audio files live in Cloudflare R2; Supabase stores metadata and URLs only.
- Categories and confessions are data, never hardcoded in app code.

## Security

- Keys in the gitignored `.env`. The app ships the anon/publishable key only (`EXPO_PUBLIC_*`). `SUPABASE_DB_URL` is for local tooling (`npm run db:apply`) only.
- RLS stays on: anonymous SELECT-only on all four tables. Don't change the policies in `db/migrations/0002_rls.sql`.

## Platform and builds

- Launch platform is Android. iOS is deferred.
- Development builds, not Expo Go (native audio module). `eas.json` "development" profile builds an internal-distribution APK with the dev client.
- New Architecture stays enabled (SDK 57 default).
- Adding a native module (anything with native code) requires a new EAS build; JS-only changes need only a Metro reload.

## Background audio

The expo-audio config plugin in app.json (`enableBackgroundPlayback: true`, `recordAudioAndroid: false`) adds the Android foreground media service and permissions. `lib/audioSession.ts` sets `shouldPlayInBackground` + `interruptionMode: 'doNotMix'` (required for lock-screen controls). `lib/usePlayer.ts` calls `setActiveForLockScreen` on every play press — without it Android kills background audio after ~3 minutes. `usePlayer` must be called once, unconditionally, at the top of the screen that owns playback, so layout changes never remount it and interrupt the stream.

## Layout

- `app/` routes: `index` (Home), `category/[id]`, `confession/[id]` (player)
- `components/`: `AnchorMark`, `CategoryMedallion`, `ListRow` + `RowDivider`, `TodayCard`, `PlayerHero`, `Waveform`, `ScriptureList`, `ScreenState`
- `lib/`: supabase client, queries, types, theme tokens, audio session, `usePlayer`
- `db/`: migrations, seeds (idempotent), `apply.mjs`, `verify-rls.mjs`

## Definition of done

- `npm run typecheck` · `npm run lint` · `npm run db:verify` pass.
- Commit and push to `main`, report the commit hash, and state whether an EAS rebuild is needed.
