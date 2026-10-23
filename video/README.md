# Anchor video (Remotion)

Promo and social video for Anchor, rendered with [Remotion](https://remotion.dev).
This is a standalone npm project: it has its own `node_modules` and runs on React DOM,
so it is deliberately kept out of the Expo app's dependency tree, Metro's watch list,
`npm run typecheck` and `npm run lint` at the repo root.

```bash
cd video
npm install
npm run studio          # open the Remotion Studio
npm run render Title out/title.mp4
```

Compositions live in `src/`. `src/theme.ts` holds the handful of Anchor tokens this
project needs, copied from the app's `lib/theme.ts` — keep them in sync by hand.
Renders go to `video/out/`, which is gitignored.
