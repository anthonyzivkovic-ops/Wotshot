export const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

// Internal calculation tool to format our simulated timestamps cleanly
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

// Huge library of dynamic variables to simulate live platform scraping
const concertArtists = ['Fred again..', 'Luude', 'The Neighbourhood', 'Foo Fighters', 'Six60', 'Lorde', 'Benee'];
const sportsClashes = ['Auckland FC vs Sydney FC', 'All Blacks vs Wallabies', 'Crusaders vs Blues', 'Black Caps vs England'];
const venues = ['Spark Arena', 'Eden Park', 'Sky Stadium', 'Wolfbrook Arena', 'Hagley Oval'];
const restaurantNames = ['Inati', 'Origine', 'Loretta', 'King of Snake', 'Amisfield'];

export const generateDynamicFeeds = () => {
  const generated = [];
  
  // 1. Generate Live Concerts
  for (let i = 0; i < 3; i++) {
    const artist = concertArtists[Math.floor(Math.random() * concertArtists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-c-${i}-${Math.random()}`,
      category: 'Concerts',
      subCategory: 'Live Tour',
      time: `${randomDay} Aug 2026`,
      title: `${artist}: Unexpected Pop-Up Live at ${venue}`,
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
      points: [`Location: ${venue}.`, 'Scrapers detected sudden ticket allocations opening up on primary vendor grids.', 'Expect high traffic on regional booking networks.'],
      source: 'Ticketmaster NZ',
      sourceUrl: 'https://www.ticketmaster.co.nz'
    });
  }

  // 2. Generate Live Sports
  for (let i = 0; i < 3; i++) {
    const clash = sportsClashes[Math.floor(Math.random() * sportsClashes.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-s-${i}-${Math.random()}`,
      category: 'Sporting Events',
      subCategory: 'Championship Match',
      time: `${randomDay} Sep 2026`,
      title: `${clash} Blockbuster Rivalry Spectacular`,
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
      points: [`Staged at the iconic ${venue} stadium footprint.`, 'High-stakes regional tier points match-up drawing global broadcast cameras.', 'Public grandstand allocations approaching capacity limits.'],
      source: 'Sky Sport NZ',
      sourceUrl: 'https://www.skysport.co.nz'
    });
  }

  // 3. Generate Live Dining Experiences
  for (let i = 0; i < 2; i++) {
    const rest = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
    generated.push({
      id: `sim-d-${i}-${Math.random()}`,
      category: 'Places to Dine',
      subCategory: 'Trending Hotspots',
      time: 'Trending Now',
      title: `${rest}: Seasonal Table Fine Dining Showcase`,
      imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
      points: ['Critically acclaimed regional menus focusing on premium local ingredients.', 'Chef table reservations are heavily booked out over the upcoming winter weekends.'],
      source: 'Cuisine Magazine',
      sourceUrl: 'https://www.google.com'
    });
  }

  return generated;
};
