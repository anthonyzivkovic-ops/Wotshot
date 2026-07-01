// Internal timestamp conversion engine to secure accurate calendar sorting calculations
export const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('Rated') || dateStr.includes('Favorite') || dateStr.includes('Trending') || dateStr.includes('ago')) {
    return new Date(); 
  }
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const month = months[parts[1]] || 0;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date();
};

export const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

export const fallbackFeedItems = [
  // ==========================================
  // 1. CONCERTS
  // ==========================================
  {
    id: 'c1',
    category: 'Concerts',
    subCategory: 'Stadium Gigs',
    time: '04 Aug 2026',
    flames: 142,
    title: 'The Neighbourhood: Live at Spark Arena',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Auckland | Spark Arena.',
      'Massive global indie-rock headliners arrive in New Zealand for their highly anticipated world tour.',
      'Tickets moving fast via mainstream local booking platforms for this prime weekend event.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz'
  },
  {
    id: 'c2',
    category: 'Concerts',
    subCategory: 'Winter Music Festivals',
    time: '11 Aug 2026',
    flames: 89,
    title: 'Luude: Australasian Winter Tour Direct Hits',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz'
  },
  {
    id: 'c3',
    category: 'Concerts',
    subCategory: 'Synth-Pop Solo',
    time: '18 Aug 2026',
    flames: 215,
    title: 'Fred again..: Surprise Arena Loop Pop-Up',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Christchurch | Wolfbrook Arena.',
      'An exclusive, highly sought-after South Island alternative layout performance announced overnight.',
      'Strict digital-only entry verification tickets are locked exclusively via official mobile box offices.'
    ],
    source: 'Ticketek NZ',
    sourceUrl: 'https://premier.ticketek.co.nz'
  },
  {
    id: 'c4',
    category: 'Concerts',
    subCategory: 'Heavy Rock Tour',
    time: '05 Sep 2026',
    flames: 174,
    title: 'Foo Fighters: Concrete and Gold Revival',
    imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Auckland | Go Media Stadium Mt Smart.',
      'The iconic rock legends return to anchor an expansive open-air stadium night layout.',
      'Premium field and structural golden-circle passes are selling fast through regional platforms.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz'
  },

  // ==========================================
  // 2. SPORTING EVENTS
  // ==========================================
  {
    id: 's1',
    category: 'Sporting Events',
    subCategory: 'International Football',
    time: '26 Aug 2026',
    flames: 96,
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  },
  {
    id: 's2',
    category: 'Sporting Events',
    subCategory: 'Rugby Union Championship',
    time: '12 Sep 2026',
    flames: 312,
    title: 'All Blacks vs Australia: Bledisloe Cup Decider',
    imageUrl: 'https://images.unsplash.com/photo-1544547611-c54d9626a515?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Wellington | Sky Stadium.',
      'The definitive annual trans-Tasman test event series match lands in the capital.',
      'Corporate hospitality suites and public grandstand ticket tiers are open via main channels.'
    ],
    source: 'Sky Stadium Box Office',
    sourceUrl: 'https://www.skystadium.co.nz'
  },
  {
    id: 's3',
    category: 'Sporting Events',
    subCategory: 'Football - UEFA',
    time: '45m ago',
    flames: 184,
    title: 'Champions League: Tactical Masterclass Books Spot in European Grand Final',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
    points: [
      'A late second-half counter-attacking structure breaks down a stubborn defensive backline configuration.',
      'Club executives confirm historic broadcast viewership figures across global streaming networks.',
      'The grand final venue initiates premium stadium preparations ahead of next month\'s fixture.'
    ],
    source: 'BBC Sport',
    sourceUrl: 'https://www.bbc.com/sport'
  },

  // ==========================================
  // 3. MOVIES
  // ==========================================
  {
    id: 'm1',
    category: 'Movies',
    subCategory: 'Cinema Blockbusters',
    time: '09 Aug 2026',
    flames: 54,
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz'
  },
  {
    id: 'm2',
    category: 'Movies',
    subCategory: 'Film Festivals',
    time: '20 Aug 2026',
    flames: 120,
    title: 'New Zealand International Film Festival: Opening Night Gala',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Christchurch | Isaac Theatre Royal.',
      'The premier presentation of award-winning global arthouse and underground features.',
      'Opening gala package passes and single-film validation vouchers are managed directly via Ticketek.'
    ],
    source: 'NZIFF Portal',
    sourceUrl: 'https://www.nziff.co.nz'
  },

  // ==========================================
  // 4. PLACES TO DINE
  // ==========================================
  {
    id: 'd1',
    category: 'Places to Dine',
    subCategory: 'Auckland Hotspots',
    time: 'Trending Now',
    flames: 198,
    title: 'Origine: Modern French Bistro Elegance in Commercial Bay',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Auckland CBD | Commercial Bay.',
      'A stunning Parisian-style glasshouse dining room serving classic French techniques with premium New Zealand seafood and meats.',
      'Highly recommended: The fresh structural seafood platters and their tailored gin cocktail pairings.'
    ],
    source: 'Origine Auckland',
    sourceUrl: 'https://www.origine.nz'
  },
  {
    id: 'd2',
    category: 'Places to Dine',
    subCategory: 'Christchurch Eateries',
    time: 'Highly Rated',
    flames: 165,
    title: 'Inati: Elegant Neo-Classic Chef\'s Table Experience',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Christchurch | Hereford Street.',
      'Sit directly at the theater-style brass counter to watch chefs construct award-winning, innovative South Island plates.',
      'Securing reservations 2-3 weeks in advance is highly recommended for weekend dinner sittings.'
    ],
    source: 'Inati Christchurch',
    sourceUrl: 'https://inati.nz'
  },
  {
    id: 'd3',
    category: 'Places to Dine',
    subCategory: 'Wellington Bistro',
    time: 'Local Favorite',
    flames: 112,
    title: 'Loretta: Artisanal Seasonal Inner-City Dining',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Wellington | Cuba Street.',
      'An airy, rustic-industrial space focused on wood-fired specialty grains, charcuterie, and rotating organic vegetable highlights.',
      'Perfect choice for casual brunch clusters or ambient low-lit evening group dinner arrangements.'
    ],
    source: 'Loretta Cuba St',
    sourceUrl: 'https://www.loretta.net.nz'
  },

  // ==========================================
  // 5. OTHER
  // ==========================================
  {
    id: 'o1',
    category: 'Other',
    subCategory: 'Live Theatre & Musicals',
    time: '22 Oct 2026',
    flames: 287,
    title: 'Wicked The Musical: Star-Studded Civic Run',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80',
    points: [
      'Location: Auckland | The Civic Theatre.',
      'The legendary Broadway production lands in Auckland for a strictly limited four-week regional season.',
      'Corporate hospitality suites and weekend matinee allocations opening to the public early.'
    ],
    source: 'Auckland Live Box Office',
    sourceUrl: 'https://www.aucklandlive.co.nz'
  }
];
