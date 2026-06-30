// Data translation calculation engine
export const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('Rated') || dateStr.includes('ago')) {
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
  {
    id: 'c1',
    category: 'Concerts',
    subCategory: 'Stadium Gigs',
    time: '26 Aug 2026',
    flames: 142,
    title: 'The Neighbourhood: Live at Spark Arena',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    points: ['Location: Auckland | Spark Arena.', 'Massive global indie-rock headliners arrive for their world tour.', 'Tickets moving fast via mainstream local booking platforms.'],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz'
  },
  {
    id: 's1',
    category: 'Sporting Events',
    subCategory: 'International Football',
    time: '26 Aug 2026',
    flames: 96,
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    points: ['Location: Auckland | Eden Park.', 'English Premier League giants travel to local shores to take on Auckland FC.', 'Part of the International Football Festival.'],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  }
];
