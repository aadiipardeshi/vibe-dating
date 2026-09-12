import { people } from './prototype';

export type FeedComment = { id: string; name: string; body: string };
export type FeedPost = {
  id: string;
  personId: string;
  name: string;
  location: string;
  avatar: number;
  media: number;
  caption: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  saved: boolean;
  timestamp: string;
  comments: FeedComment[];
};

export const feedPosts: FeedPost[] = [
  {
    id: 'post-1', personId: 'maya', name: 'Maya', location: 'Koregaon Park',
    avatar: people[0].photos[0], media: people[0].photos[0],
    caption: 'A little time outside before the week starts.',
    likeCount: 24, commentCount: 1, liked: false, saved: false, timestamp: '20 minutes ago',
    comments: [{ id: 'comment-1', name: 'Anika', body: 'The best kind of Sunday.' }],
  },
  {
    id: 'post-2', personId: 'anika', name: 'Anika', location: 'Baner',
    avatar: people[1].photos[0], media: people[1].photos[0],
    caption: 'Taking the long way home. Always worth it.',
    likeCount: 18, commentCount: 1, liked: false, saved: false, timestamp: '1 hour ago',
    comments: [{ id: 'comment-2', name: 'Maya', body: 'Next time, take me along!' }],
  },
  {
    id: 'post-3', personId: 'maya', name: 'Maya', location: 'Pune',
    avatar: people[0].photos[0], media: people[0].photos[1],
    caption: 'No plans, just a good playlist.',
    likeCount: 31, commentCount: 0, liked: false, saved: false, timestamp: '3 hours ago', comments: [],
  },
  {
    id: 'post-4', personId: 'anika', name: 'Anika', location: 'Pune',
    avatar: people[1].photos[0], media: people[1].photos[1],
    caption: 'A favourite from the camera roll.',
    likeCount: 12, commentCount: 0, liked: false, saved: false, timestamp: 'Yesterday', comments: [],
  },
];
