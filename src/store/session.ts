import { create } from 'zustand';

import type { User } from '@/types';

type SessionState = {
  user: User | null;
  onboardingComplete: boolean;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
  completeOnboarding: () => void;
  signOut: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  onboardingComplete: false,
  signIn: (user) => set({ user, onboardingComplete: true }),
  signUp: (user) => set({ user, onboardingComplete: false }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  signOut: () => set({ user: null, onboardingComplete: false }),
}));
