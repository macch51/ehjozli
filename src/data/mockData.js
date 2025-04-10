// Event Categories
export const categories = [
  { id: 1, name: 'Concerts', icon: 'music' },
  { id: 2, name: 'Theater & Arts', icon: 'theater-masks' },
  { id: 3, name: 'Sports', icon: 'basketball-ball' },
  { id: 4, name: 'Family', icon: 'child' },
  { id: 5, name: 'Comedy', icon: 'laugh' },
  { id: 6, name: 'Conferences', icon: 'briefcase' },
];

// Locations
export const locations = [
  { id: 1, name: 'New York', state: 'NY' },
  { id: 2, name: 'Los Angeles', state: 'CA' },
  { id: 3, name: 'Chicago', state: 'IL' },
  { id: 4, name: 'Miami', state: 'FL' },
  { id: 5, name: 'Austin', state: 'TX' },
  { id: 6, name: 'San Francisco', state: 'CA' },
];

// Sample Events
export const events = [
  {
    id: 1,
    title: 'Taylor Swift: The Eras Tour',
    categoryId: 1,
    locationId: 1,
    venue: 'Madison Square Garden',
    date: '2025-05-15T19:30:00',
    image: 'https://dummyimage.com/300x200/2346ba/ffffff',
    price: { min: 89.99, max: 399.99 },
    description: 'Join Taylor Swift on her record-breaking Eras Tour as she performs her biggest hits spanning her entire career.',
    organizer: {
      id: 101,
      name: 'Live Nation Entertainment',
      logo: 'https://dummyimage.com/100x100/23b85a/ffffff',
    },
    announcements: [
      { id: 1001, date: '2025-03-01', text: 'Additional tickets released for the show!' },
      { id: 1002, date: '2025-03-15', text: 'Show will start at 7:30 PM sharp. Doors open at 6:00 PM.' },
    ],
    seatingChart: 'https://dummyimage.com/500x400/b82593/ffffff',
    available: true,
  },
  {
    id: 2,
    title: 'Hamilton',
    categoryId: 2,
    locationId: 1,
    venue: 'Richard Rodgers Theatre',
    date: '2025-05-20T19:00:00',
    image: 'https://dummyimage.com/300x200/2346ba/ffffff',
    price: { min: 199.99, max: 699.99 },
    description: 'Hamilton is the story of America then, told by America now. Featuring a score that blends hip-hop, jazz, R&B and Broadway.',
    organizer: {
      id: 102,
      name: 'Broadway Productions',
      logo: 'https://dummyimage.com/100x100/23b85a/ffffff',
    },
    announcements: [
      { id: 2001, date: '2025-04-01', text: 'Cast change announcement for the role of King George.' },
    ],
    seatingChart: 'https://dummyimage.com/500x400/b82593/ffffff',
    available: true,
  },
  {
    id: 3,
    title: 'Lakers vs. Knicks',
    categoryId: 3,
    locationId: 1,
    venue: 'Madison Square Garden',
    date: '2025-05-18T20:00:00',
    image: 'https://dummyimage.com/300x200/2346ba/ffffff',
    price: { min: 75.99, max: 350.99 },
    description: 'Watch the Los Angeles Lakers take on the New York Knicks in this exciting NBA regular season matchup.',
    organizer: {
      id: 103,
      name: 'NBA',
      logo: 'https://dummyimage.com/100x100/23b85a/ffffff',
    },
    announcements: [],
    seatingChart: 'https://dummyimage.com/500x400/b82593/ffffff',
    available: true,
  },
  // Add a few more events here...
];

// Export other mock data as needed
export const TICKET_STATUSES = {
  VALID: 'valid',
  USED: 'used',
  EXPIRED: 'expired',
  REFUNDED: 'refunded',
};