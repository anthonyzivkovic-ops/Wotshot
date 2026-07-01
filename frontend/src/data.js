export const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

// Clean timestamp parser for layout organization
export const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('ago')) return new Date();
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const months = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
    return new Date(2026, months[parts[1]] || 0, day);
  }
  return new Date();
};

// Rich editorial libraries for dynamic creation
const concertArtists = ['Fred again..', 'Luude', 'The Neighbourhood', 'Foo Fighters', 'Six60', 'Lorde', 'Benee'];
const sportsClashes = ['Auckland FC vs Sydney FC', 'All Blacks vs Wallabies', 'Crusaders vs Blues', 'Black Caps vs England'];
const venues = ['Spark Arena', 'Eden Park', 'Sky Stadium', 'Wolfbrook Arena', 'Hagley Oval'];
const restaurantNames = ['Inati', 'Origine', 'Loretta', 'King of Snake', 'Amisfield'];

export const generateDynamicFeeds = () => {
  const generated = [];
  
  // 1. Generate Curated Concert Headlines
  for (let i = 0; i < 3; i++) {
    const artist = concertArtists[Math.floor(Math.random() * concertArtists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-c-${i}-${Math.random()}`,
      category: 'Concerts',
      subCategory: 'Trending Tour',
      time: `${randomDay} Aug 2026`,
      title: `${artist} Announces Surprise Pop-Up Show at ${venue}!`,
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
      points: [
        `Venue Spotlight: Set to take over the spectacular grounds at ${venue}.`,
        'This highly anticipated event is currently trending across the country following an overnight announcement.',
        'Demand is incredibly high—insiders suggest jumping in early to lock down remaining general admission spots.'
      ],
      source: 'Ticketmaster NZ',
      sourceUrl: 'https://www.ticketmaster.co.nz'
    });
  }

  // 2. Generate Curated Sports Highlights
  for (let i = 0; i < 3; i++) {
    const clash = sportsClashes[Math.floor(Math.random() * sportsClashes.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-s-${i}-${Math.random()}`,
      category: 'Sporting Events',
      subCategory: 'Big Matchup',
      time: `${randomDay} Sep 2026`,
      title: `${clash}: Massive Matchup Headed to New Zealand`,
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
      points: [
        `Staged live from the iconic layout at ${venue}.`,
        'A historic, high-stakes rivalry match that is expected to bring electric crowd energy to the stands.',
        'Public grandstand and premium hospitality seating configurations are already approaching capacity limits.'
      ],
      source: 'Sky Sport NZ',
      sourceUrl: 'https://www.skysport.co.nz'
    });
  }

  // 3. Generate Curated Dining Spotlights
  for (let i = 0; i < 2; i++) {
    const rest = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
    generated.push({
      id: `sim-d-${i}-${Math.random()}`,
      category: 'Places to Dine',
      subCategory: 'Local Hotspot',
      time: 'Trending Now',
      title: `${rest}: The Must-Visit Dining Experience of the Season`,
      imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
      points: [
        'A stunning menu layout putting premium, hand-picked local New Zealand ingredients front and center.',
        'This vibrant spot has become an absolute city favorite—perfect for weekend dinner plans or celebratory gatherings.'
      ],
      source: 'Cuisine Magazine',
      sourceUrl: 'https://www.google.com'
    });
  }

  return generated;
};
