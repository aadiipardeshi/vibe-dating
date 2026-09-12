export type UserId = string;
export type ProfileId = string;
export type MatchId = string;

export type Gender = 'woman' | 'man' | 'nonbinary' | 'self_describe';
export type RelationshipIntent = 'dating' | 'relationship' | 'friends' | 'figuring_out';
export type MediaType = 'image' | 'video';

export interface User {
  id: UserId;
  email: string | null;
  phone: string | null;
  createdAt: string;
  lastSeenAt: string | null;
}

export interface ProfilePhoto {
  id: string;
  profileId: ProfileId;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Interest {
  id: string;
  name: string;
  category: string;
}

export interface Vibe {
  id: string;
  name: string;
  description: string;
  city: string;
}

export interface Profile {
  id: ProfileId;
  userId: UserId;
  displayName: string;
  birthDate: string;
  gender: Gender | null;
  city: string;
  neighborhood: string | null;
  bio: string | null;
  occupation: string | null;
  photos: ProfilePhoto[];
  interests: Interest[];
  vibes: Vibe[];
  intent: RelationshipIntent | null;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  profileId: ProfileId;
  body: string | null;
  mediaUrl: string | null;
  mediaType: MediaType | null;
  placeName: string | null;
  city: string;
  createdAt: string;
}

export interface Like {
  id: string;
  fromUserId: UserId;
  toProfileId: ProfileId;
  createdAt: string;
}

export interface Match {
  id: MatchId;
  userAId: UserId;
  userBId: UserId;
  createdAt: string;
  lastMessageAt: string | null;
}

export interface Message {
  id: string;
  matchId: MatchId;
  senderId: UserId;
  body: string;
  createdAt: string;
  readAt: string | null;
}
