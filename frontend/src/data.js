// Internal timestamp conversion engine to secure accurate calendar sorting calculations
export const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('Rated') || dateStr.includes('Favorite') || dateStr.includes('Trending')) {
    return new Date(8640000000000000); // Send dynamic items without fixed calendar slots to the absolute bottom
  }
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const month = months[parts[1]] || 0;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(0);
};

export const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

export const initialFeedItems = [
  // ==========================================
  // 1. CONCERTS
  // ==========================================
  {
    id: 'c1',
    category: 'Concerts',
    subCategory: 'Stadium Gigs',
    time: '04 Aug 2026',
    title: 'The Neighbourhood: Live at Spark Arena',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Spark Arena.',
      'Massive global indie-rock headliners arrive in New Zealand for their highly anticipated world tour.',
      'Tickets moving fast via mainstream local booking platforms for this prime weekend event.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz/the-neighbourhood-tickets/artist/1769438'
  },
  {
    id: 'c2',
    category: 'Concerts',
    subCategory: 'Winter Music Festivals',
    time: '11 Aug 2026',
    title: 'Luude: Australasian Winter Tour Direct Hits',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz/artist-luude-1349814'
  },
  {
    id: 'c3',
    category: 'Concerts',
    subCategory: 'Synth-Pop Solo',
    time: '18 Aug 2026',
    title: 'Fred again..: Surprise Arena Loop Pop-Up',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop',
    points: [
      'Location: Christchurch | Wolfbrook Arena.',
      'An exclusive, highly sought-after South Island alternative layout performance announced overnight.',
      'Strict digital-only entry verification tickets are locked exclusively via official mobile box offices.'
    ],
    source: 'Ticketek NZ',
    sourceUrl: 'https://premier.ticketek.co.nz/shows/show.aspx?sh=FREDAGAIN26'
  },
  {
    id: 'c4',
    category: 'Concerts',
    subCategory: 'Heavy Rock Tour',
    time: '05 Sep 2026',
    title: 'Foo Fighters: Concrete and Gold Revival',
    imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Go Media Stadium Mt Smart.',
      'The iconic rock legends return to anchor an expansive open-air stadium night layout.',
      'Premium field and structural golden-circle passes are selling fast through regional platforms.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz/foo-fighters-tickets/artist/776005'
  },

  // ==========================================
  // 2. SPORTING EVENTS
  // ==========================================
  {
    id: 's1',
    category: 'Sporting Events',
    subCategory: 'International Football',
    time: '26 Aug 2026',
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz/view-event/tottenham-hotspur-vs-auckland-fc-2026'
  },
  {
    id: 's2',
    category: 'Sporting Events',
    subCategory: 'Rugby Union Championship',
    time: '12 Sep 2026',
    title: 'All Blacks vs Australia: Bledisloe Cup Decider',
    imageUrl: 'https://images.unsplash.com/photo-1544547611-c54d9626a515?w=800&auto=format&fit=crop',
    points: [
      'Location: Wellington | Sky Stadium.',
      'The definitive annual trans-Tasman test event series match lands in the capital.',
      'Corporate hospitality suites and public grandstand ticket tiers are open via main channels.'
    ],
    source: 'Sky Stadium Box Office',
    sourceUrl: 'https://www.skystadium.co.nz/whats-on/event/all-blacks-v-australia-2026'
  },
  {
    id: 's3',
    category: 'Sporting Events',
    subCategory: 'Domestic Basketball',
    time: '19 Sep 2026',
    title: 'BNZ Breakers vs Sydney Kings: NBL Season Opener',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Spark Arena.',
      'A premium physical rivalry clash opens up the official regional basketball season pipeline.',
      'Court-side lounge packages and standard fan seating brackets are accessible via direct links.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz/nz-breakers-tickets/artist/1154541'
  },

  // ==========================================
  // 3. MOVIES
  // ==========================================
  {
    id: 'm1',
    category: 'Movies',
    subCategory: 'Cinema Blockbusters',
    time: '09 Aug 2026',
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz/Movies/Promotions'
  },
  {
    id: 'm2',
    category: 'Movies',
    subCategory: 'Independent Film Festival',
    time: '20 Aug 2026',
    title: 'New Zealand International Film Festival: Opening Night Gala',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop',
    points: [
      'Location: Christchurch | Isaac Theatre Royal.',
      'The premier presentation of award-winning global arthouse and underground features.',
      'Opening gala package passes and single-film validation vouchers are managed directly via Ticketek.'
    ],
    source: 'NZIFF Ticket Portal',
    sourceUrl: 'https://www.nziff.co.nz/2026/christchurch/ticketing/'
  },
  {
    id: 'm3',
    category: 'Movies',
    subCategory: 'Sci-Fi IMAX Experience',
    time: '03 Sep 2026',
    title: 'Interstellar Realignment: Special 70mm IMAX IMAX Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Event Cinemas Queen Street.',
      'A spectacular anniversary screening re-engineered for the Southern Hemisphere\'s largest high-contrast display setup.',
      'Premium central row bookings are strictly limited and sold directly online.'
    ],
    source: 'Event Cinemas Queen St',
    sourceUrl: 'https://www.eventcinemas.co.nz/Cinema/Queen-Street'
  },

  // ==========================================
  // 4. PLACES TO DINE
  // ==========================================
  {
    id: 'd1',
    category: 'Places to Dine',
    subCategory: 'Auckland Culinary Hotspots',
    time: 'Trending Now',
    title: 'Origine: Modern French Bistro Elegance in Commercial Bay',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland CBD | Commercial Bay.',
      'A stunning Parisian-style glasshouse dining room serving classic French techniques with premium New Zealand seafood and meats.',
      'Highly recommended: The fresh structural seafood platters and their tailored gin cocktail pairings.'
    ],
    source: 'Origine Menu Interface',
    sourceUrl: 'https://www.origine.nz/menu'
  },
  {
    id: 'd2',
    category: 'Places to Dine',
    subCategory: 'Christchurch Eateries',
    time: 'Highly Rated',
    title: 'Inati: Elegant Neo-Classic Chef\'s Table Experience',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
    points: [
      'Location: Christchurch | Hereford Street.',
      'Sit directly at the theater-style brass counter to watch chefs construct award-winning, innovative South Island plates.',
      'Securing reservations 2-3 weeks in advance is highly recommended for weekend dinner sittings.'
    ],
    source: 'Inati Bookings & Menus',
    sourceUrl: 'https://inati.nz/menu/'
  },
  {
    id: 'd3',
    category: 'Places to Dine',
    subCategory: 'Wellington Bistro',
    time: 'Local Favorite',
    title: 'Loretta: Artisanal Seasonal Inner-City Dining',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
    points: [
      'Location: Wellington | Cuba Street.',
      'An airy, rustic-industrial space focused on wood-fired specialty grains, charcuterie, and rotating organic vegetable highlights.',
      'Perfect choice for casual brunch clusters or ambient low-lit evening group dinner arrangements.'
    ],
    source: 'Loretta Cuba St Menu',
    sourceUrl: 'https://www.loretta.net.nz/menu'
  },
  {
    id: 'd4',
    category: 'Places to Dine',
    subCategory: 'Christchurch Fusion',
    time: 'New Entry',
    title: 'King of Snake: Sophisticated Southeast Asian Fine Dining',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop',
    points: [
      'Location: Christchurch | Oxford Terrace Strip.',
      'Immersive, moody design meets boundary-pushing premium Asian execution along the buzzing retail terrace.',
      'The signature crispy red duck curry and premium local Sauvignon cuts dominate the current seasonal menus.'
    ],
    source: 'King of Snake Digital Menu',
    sourceUrl: 'https://kingofsnake.co.nz/menus/'
  },
  {
    id: 'd5',
    category: 'Places to Dine',
    subCategory: 'Auckland Casual',
    time: 'High Demand',
    title: 'Prego: Iconic Italian Trattoria in Ponsonby',
    imageUrl: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Ponsonby Road.',
      'A legendary brick courtyard institution serving unmatched woodfired pizzas, fresh pasta, and dynamic bistro staples.',
      'Maintains a popular walk-in structure alongside early lunch booking availability.'
    ],
    source: 'Prego Ponsonby Menu',
    sourceUrl: 'https://www.prego.co.nz/menu'
  },

  // ==========================================
  // 5. OTHER
  // ==========================================
  {
    id: 'o1',
    category: 'Other',
    subCategory: 'Live Theatre & Musicals',
    time: '22 Oct 2026',
    title: 'Wicked The Musical: Star-Studded Civic Run',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | The Civic Theatre.',
      'The legendary Broadway production lands in Auckland for a strictly limited four-week regional season.',
      'Corporate hospitality suites and weekend matinee allocations opening to the public early.'
    ],
    source: 'Auckland Live Box Office',
    sourceUrl: 'https://www.aucklandlive.co.nz/show/wicked-the-musical-2026'
  },
  {
    id: 'o2',
    category: 'Other',
    subCategory: 'Comedy Gala',
    time: '29 Oct 2026',
    title: 'NZ International Comedy Festival Highlight Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=800&auto=format&fit=crop',
    points: [
      'Location: Wellington | The Opera House.',
      'A dense, high-caliber line-up hosting top-tier trans-Tasman stand-up artists across one grand performance evening.',
      'Single-seat allocations and VIP floor tables can be processed seamlessly through verified ticket routes.'
    ],
    source: 'Ticketmaster Booking Hub',
    sourceUrl: 'https://www.ticketmaster.co.nz/nz-international-comedy-festival-tickets/artist/1852203'
  }
];
