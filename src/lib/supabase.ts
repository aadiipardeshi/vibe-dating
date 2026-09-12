import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { env, isSupabaseConfigured } from '@/constants/env';

let client: SupabaseClient | null = null;

export { isSupabaseConfigured };

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!client) {
    const url = env.supabaseUrl;
    const anonKey = env.supabaseAnonKey;
    if (!url || !anonKey) {
      return null;
    }

    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }

  return client;
}
