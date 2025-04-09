// src/data/mockData.js

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
      image: 'https://via.placeholder.com/300x200',
      price: { min: 89.99, max: 399.99 },
      description: 'Join Taylor Swift on her record-breaking Eras Tour as she performs her biggest hits spanning her entire career.',
      organizer: {
        id: 101,
        name: 'Live Nation Entertainment',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [
        { id: 1001, date: '2025-03-01', text: 'Additional tickets released for the show!' },
        { id: 1002, date: '2025-03-15', text: 'Show will start at 7:30 PM sharp. Doors open at 6:00 PM.' },
      ],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
    {
      id: 2,
      title: 'Hamilton',
      categoryId: 2,
      locationId: 1,
      venue: 'Richard Rodgers Theatre',
      date: '2025-05-20T19:00:00',
      image: 'https://via.placeholder.com/300x200',
      price: { min: 199.99, max: 699.99 },
      description: 'Hamilton is the story of America then, told by America now. Featuring a score that blends hip-hop, jazz, R&B and Broadway.',
      organizer: {
        id: 102,
        name: 'Broadway Productions',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [
        { id: 2001, date: '2025-04-01', text: 'Cast change announcement for the role of King George.' },
      ],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
    {
      id: 3,
      title: 'Lakers vs. Knicks',
      categoryId: 3,
      locationId: 1,
      venue: 'Madison Square Garden',
      date: '2025-05-18T20:00:00',
      image: 'https://via.placeholder.com/300x200',
      price: { min: 75.99, max: 350.99 },
      description: 'Watch the Los Angeles Lakers take on the New York Knicks in this exciting NBA regular season matchup.',
      organizer: {
        id: 103,
        name: 'NBA',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
    {
      id: 4,
      title: 'Disney On Ice',
      categoryId: 4,
      locationId: 3,
      venue: 'United Center',
      date: '2025-06-10T18:00:00',
      image: 'https://via.placeholder.com/300x200',
      price: { min: 45.99, max: 125.99 },
      description: 'Disney On Ice presents Frozen & Encanto - an adventure filled with magical moments from your favorite Disney stories.',
      organizer: {
        id: 104,
        name: 'Feld Entertainment',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [
        { id: 4001, date: '2025-05-01', text: 'Special meet and greet packages now available!' },
      ],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
    {
      id: 5,
      title: 'Kevin Hart: Reality Check Tour',
      categoryId: 5,
      locationId: 2,
      venue: 'Hollywood Bowl',
      date: '2025-06-25T20:00:00',
      image: 'https://via.placeholder.com/300x200',
      price: { min: 59.99, max: 159.99 },
      description: 'Kevin Hart returns with his hilarious new stand-up comedy tour, sharing his unfiltered take on life.',
      organizer: {
        id: 105,
        name: 'Live Nation Comedy',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [
        { id: 5001, date: '2025-05-15', text: 'Second show added due to popular demand!' },
      ],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
    {
      id: 6,
      title: 'Tech Innovation Summit 2025',
      categoryId: 6,
      locationId: 6,
      venue: 'Moscone Center',
      date: '2025-07-10T09:00:00',
      image: 'https://via.placeholder.com/300x200',
      price: { min: 299.99, max: 999.99 },
      description: 'Join industry leaders and innovators for three days of inspiring talks, workshops, and networking opportunities.',
      organizer: {
        id: 106,
        name: 'TechConferences Inc.',
        logo: 'https://via.placeholder.com/100x100',
      },
      announcements: [
        { id: 6001, date: '2025-04-20', text: 'Keynote speaker announcement: Elon Musk confirmed!' },
        { id: 6002, date: '2025-05-10', text: 'Early bird registration ending soon.' },
      ],
      seatingChart: 'https://via.placeholder.com/500x400',
      available: true,
    },
  ];
  
  // Sample Users
  export const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      tickets: [
        { id: 101, eventId: 1, seat: 'Section A, Row 5, Seat 12', price: 149.99, purchaseDate: '2025-02-15' },
        { id: 102, eventId: 3, seat: 'Section C, Row 10, Seat 8', price: 89.99, purchaseDate: '2025-03-01' },
      ],
      savedEvents: [2, 5],
      paymentMethods: [
        { id: 201, type: 'credit', last4: '4242', expiry: '05/26' },
      ],
    },
  ];
  
  // Sample Organizers
  export const organizers = [
    {
      id: 101,
      name: 'Live Nation Entertainment',
      email: 'events@livenation.com',
      logo: 'https://via.placeholder.com/100x100',
      events: [1, 5],
      announcements: [
        { id: 1001, eventId: 1, date: '2025-03-01', text: 'Additional tickets released for the show!' },
        { id: 1002, eventId: 1, date: '2025-03-15', text: 'Show will start at 7:30 PM sharp. Doors open at 6:00 PM.' },
        { id: 5001, eventId: 5, date: '2025-05-15', text: 'Second show added due to popular demand!' },
      ],
      sales: {
        total: 245890.50,
        byEvent: [
          { eventId: 1, total: 158790.50, tickets: 987 },
          { eventId: 5, total: 87100.00, tickets: 725 },
        ],
      },
    },
    {
      id: 102,
      name: 'Broadway Productions',
      email: 'info@broadwayproductions.com',
      logo: 'https://via.placeholder.com/100x100',
      events: [2],
      announcements: [
        { id: 2001, eventId: 2, date: '2025-04-01', text: 'Cast change announcement for the role of King George.' },
      ],
      sales: {
        total: 356780.25,
        byEvent: [
          { eventId: 2, total: 356780.25, tickets: 532 },
        ],
      },
    },
  ];
  
  // Admin data
  export const adminDashboardData = {
    totalEvents: 35,
    totalUsers: 12547,
    totalOrganizers: 28,
    totalSales: 3854290.75,
    recentEvents: events.slice(0, 5),
    topSellingEvents: [
      { id: 1, title: 'Taylor Swift: The Eras Tour', sales: 1254890.50, tickets: 7865 },
      { id: 2, title: 'Hamilton', sales: 985630.25, tickets: 1532 },
      { id: 7, title: 'Beyoncé Renaissance World Tour', sales: 854320.75, tickets: 5421 },
    ],
    salesByCategory: [
      { categoryId: 1, name: 'Concerts', amount: 2154890.50 },
      { categoryId: 2, name: 'Theater & Arts', amount: 1058630.25 },
      { categoryId: 3, name: 'Sports', amount: 458970.00 },
      { categoryId: 4, name: 'Family', amount: 125480.50 },
      { categoryId: 5, name: 'Comedy', amount: 56320.50 },
    ],
  };