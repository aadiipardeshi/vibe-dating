import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import type { MatchId, Profile, ProfileId } from '@/types';

export class ApiUnavailableError extends Error {
  constructor(message = 'Supabase is not configured yet.') {
    super(message);
    this.name = 'ApiUnavailableError';
  }
}

export const queryKeys = {
  me: ['me'] as const,
  profiles: ['profiles'] as const,
  profile: (id: ProfileId) => ['profiles', id] as const,
  posts: ['posts'] as const,
  matches: ['matches'] as const,
  messages: (matchId: MatchId) => ['messages', matchId] as const,
};

async function requireClient() {
  const client = getSupabaseClient();
  if (!client) {
    throw new ApiUnavailableError();
  }
  return client;
}

export const api = {
  isReady: isSupabaseConfigured,

  async getProfile(id: ProfileId): Promise<Profile> {
    const client = await requireClient();
    const { data, error } = await client.from('profiles').select('*').eq('id', id).single();
    if (error) {
      throw error;
    }
    return data as Profile;
  },
};
