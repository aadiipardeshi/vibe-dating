import { create } from 'zustand';
import { type LocalMessage } from '@/data/prototype';

export const defaultProfile = {
  name: 'Aadi', age: '24', location: 'Pune, India',
  bio: 'Coffee, good conversations and plans that turn into great stories.',
  interests: 'Photography, Coffee walks, Architecture',
  lifestyle: 'Slow weekends, spontaneous travel', intent: 'A lasting connection',
};
export type LocalProfile = typeof defaultProfile;
type PrototypeState = {
  profile: LocalProfile;
  messages: Record<string, LocalMessage[]>;
  decisions: Record<string, 'like' | 'pass'>;
  notificationsEnabled: boolean;
  updateProfile: (profile: Partial<LocalProfile>) => void;
  send: (id: string, body: string) => void;
  decide: (id: string, decision: 'like' | 'pass') => void;
  setNotifications: (enabled: boolean) => void;
  reset: () => void;
};
export const usePrototypeStore = create<PrototypeState>((set) => ({
  profile: { ...defaultProfile }, messages: {}, decisions: {}, notificationsEnabled: true,
  updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  send: (id, body) => {
    if (!body.trim()) return;
    const now = new Date();
    const message = { id: `${now.getTime()}-${Math.random()}`, body: body.trim(), sent: true, time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    set((state) => ({ messages: { ...state.messages, [id]: [...(state.messages[id] ?? []), message] } }));
  },
  decide: (id, decision) => set((state) => ({ decisions: { ...state.decisions, [id]: decision } })),
  setNotifications: (notificationsEnabled) => set({ notificationsEnabled }),
  reset: () => set({ profile: { ...defaultProfile }, messages: {}, decisions: {}, notificationsEnabled: true }),
}));
