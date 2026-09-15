/**
 * Public runtime configuration. Expo inlines `process.env.EXPO_PUBLIC_*` at build time,
 * so these must be read with the literal names below (no dynamic lookups).
 * Only the anon key is ever shipped; Row Level Security limits it to reads.
 */
export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
} as const;

export const isConfigured = env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;

export const MISSING_CONFIG_MESSAGE =
  'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env, then restart Expo.';
