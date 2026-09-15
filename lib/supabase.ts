import { createClient } from '@supabase/supabase-js';

import { env, isConfigured } from '@/lib/env';
import type { Database } from '@/lib/types';

// createClient throws on an empty URL or key. When .env is missing we still want the app
// to boot and show a configuration message, so fall back to inert placeholder values.
// Queries check `isConfigured` before touching the network.
const url = isConfigured ? env.supabaseUrl : 'https://not-configured.invalid';
const anonKey = isConfigured ? env.supabaseAnonKey : 'not-configured';

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    // No auth in Phase 1: keep the client stateless and avoid an AsyncStorage dependency.
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
