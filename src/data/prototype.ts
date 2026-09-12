// Bundled photography keeps this prototype available offline.
export const accountPhoto = require('@/assets/images/profilepic.jpg');
const secondPhoto = require('@/assets/images/profilepic2.jpg');

export const people = [
  {
    id: 'maya', name: 'Maya', age: 27, neighborhood: 'Koregaon Park', city: 'Pune',
    occupation: 'Architect', resonance: 87, photos: [accountPhoto, secondPhoto] as number[],
    bio: 'Architect by day, explorer by weekend. Drawn to quiet mornings, forgotten bookshops and unscripted road journeys.',
    tags: ['Coastal Hikes', 'Filter Coffee', '35mm Film', 'Architecture', 'Vinyl'],
    funQuestion: 'An ideal rainy day?', funAnswer: 'Coffee, a good book, and a window with a view.',
    friendsThink: 'The person who turns a simple plan into an unforgettable adventure.',
    note: 'You both gravitate toward spontaneous weekend escapes and slow mornings.',
    preview: 'That little bookshop sounds exactly like my kind of Sunday.',
    messages: ['You mentioned forgotten bookshops. What is your current favourite?', 'That little bookshop sounds exactly like my kind of Sunday.'],
    dateIdea: 'Would you like to explore a bookshop and get coffee this weekend?',
  },
  {
    id: 'anika', name: 'Anika', age: 25, neighborhood: 'Baner', city: 'Pune',
    occupation: 'Designer', resonance: 92, photos: [secondPhoto, accountPhoto] as number[],
    bio: 'Collecting little moments: morning markets, art galleries and long lunches. Always looking for the scenic route home.',
    tags: ['Art Galleries', 'Sunday Markets', 'Design', 'Long Lunches', 'Travel'],
    funQuestion: 'A perfect Sunday looks like...', funAnswer: 'Good food, great music, and absolutely no plans.',
    friendsThink: 'Always knows the best place to eat and makes everyone feel at home.',
    note: 'You share a curiosity for art, neighbourhood cafés and unhurried weekends.',
    preview: 'Coffee first, then we can decide where the afternoon goes.',
    messages: ['Have you seen the new gallery near the market?', 'Coffee first, then we can decide where the afternoon goes.'],
    dateIdea: 'Shall we get coffee and visit the gallery on Sunday?',
  },
];
export type Person = (typeof people)[number];
// Keep old preview deep links usable without conflating new identities.
export function getPerson(id?: string) {
  return people.find((person) => person.id === (id === 'preview' || id === '1' ? 'maya' : id === '2' ? 'anika' : id));
}

export type LocalMessage = { id: string; body: string; sent: boolean; time: string };
export function initialMessages(person: Person): LocalMessage[] {
  return person.messages.map((body, index) => ({ id: `${person.id}-${index}`, body, sent: false, time: index ? '8:42 PM' : '8:36 PM' }));
}
