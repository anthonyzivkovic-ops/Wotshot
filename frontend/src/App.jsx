import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Hardened "What's Coming Up" Data Model with varied dates for sorting verification
const initialFeedItems = [
  {
    id: 'c1',
    category: 'Concerts',
    subCategory: 'Stadium Gigs',
    time: '04 Aug 2026', // August 4
    title: 'The Neighbourhood: Live at Spark Arena',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Spark Arena.',
      'Massive global indie-rock headliners arrive in New Zealand for their highly anticipated world tour.',
      'Tickets moving fast via mainstream local booking platforms for this prime weekend event.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz'
  },
  {
    id: 'm1',
    category: 'Movies',
    subCategory: 'Cinema Blockbusters',
    time: '09 Aug 2026', // August 9
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz'
  },
  {
    id: 'c2',
    category: 'Concerts',
    subCategory: 'Winter Music Festivals',
    time: '11 Aug 2026', // August 11
    title: 'Luude: Australasian Winter Tour Direct Hits',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10 dates).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz'
  },
  {
    id: 's1',
    category: 'Sporting Events',
    subCategory: 'International Football',
    time: '26 Aug 2026', // August 26
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  },
  {
    id: 'o1',
    category: 'Other',
    subCategory: 'Live Theatre & Musicals',
    time: '22 Oct 2026', // October 22 (Furthest out date)
    title: 'Wicked The Musical: Star-Studded Civic Run',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop',
    points: [
      'Location: Auckland | The Civic Theatre.',
      'The legendary Broadway production lands in Auckland for a strictly limited four-week regional season.',
      'Corporate hospitality suites and weekend matinee allocations opening to the public early.'
    ],
    source: 'Auckland Live',
    sourceUrl: 'https://www.aucklandlive.co.nz'
  },

  // PLACES TO DINE (No concrete event dates, stays pinned beautifully below chronological timelines)
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
    source: 'Viva Magazine',
    sourceUrl: 'https://www.viva.co.nz'
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
    source: 'Cuisine Magazine',
    sourceUrl: 'https://www.cuisine.co.nz'
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
    source: 'Denizen',
    sourceUrl: 'https://www.thedenizen.co.nz'
  }
];

const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

function SafeFeedImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);

  const handleError = () => {
    if (!isFallback) {
      setImgSrc('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop');
      setIsFallback(true);
    }
  };

  return (
    <div className="my-3.5 overflow-hidden rounded-lg border border-neutral-800/80 bg-neutral-900 relative min-h-[180px] flex items-center justify-center">
      <img 
        src={imgSrc} 
        alt={alt} 
        onError={handleError}
        className="w-full h-48 sm:h-56 object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
        loading="lazy"
      />
    </div>
  );
}

// Internal timestamp conversion engine to secure accurate calendar sorting sorting calculations
const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('Rated') || dateStr.includes('Favorite')) {
    return new Date(8640000000000000); // Send dynamic items without fixed calendar slots to the absolute bottom of the pile
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

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic sorting router engine
  const getSortedItems = () => {
    if (activeCategory === 'Places to Dine') {
      return initialFeedItems.filter(item => item.category === 'Places to Dine');
    }

    if (activeCategory !== 'All') {
      return initialFeedItems
        .filter(item => item.category === activeCategory)
        .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));
    }

    // Tab is set to 'All': Chronological items sort up top, dining elements rest comfortably below
    const timedItems = initialFeedItems
      .filter(item => item.category !== 'Places to Dine')
      .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));

    const diningItems = initialFeedItems.filter(item => item.category === 'Places to Dine');

    return [...timedItems, ...diningItems];
  };

  const filteredItems = getSortedItems();

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Refresh gives visual feedback without disrupting system order structures
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const handleLinkNavigation = (e, item) => {
    e.preventDefault();
    if (!item.sourceUrl || item.sourceUrl === '#') {
      const query = encodeURIComponent(`${item.title} New Zealand`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(item.sourceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-50 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h1 className="text-xl font-black tracking-wider text-white">
              WOTS-<span className="text-orange-500">HOT</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-5 shadow-md border border-neutral-800 rounded-sm" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
              <rect width="600" height="300" fill="#00247d"/>
              <g transform="scale(0.5)">
                <path d="M0,0 L600,300 M0,300 L600,0 M300,0 L300,300 M0,150 L600,150" stroke="#fff" strokeWidth="60"/>
                <path d="M0,0 L600,300 M0,300 L600,0" stroke="#cc142b" strokeWidth="40"/>
                <path d="M300,0 L300,300 M0,150 L600,150" stroke="#cc142b" strokeWidth="40"/>
              </g>
              <g transform="translate(450, 240) scale(0.6)">
                <polygon points="0,-25 7,-7 25,-7 10,4 15,22 0,11 -15,22 -10,4 -25,-7 -7,-7" fill="#fff"/>
                <polygon points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5" fill="#cc142b"/>
              </g>
              <g transform="translate(450, 60) scale(0.6)">
                <polygon points="0,-25 7,-7 25,-7 10,4 15,22 0,11 -15,22 -10,4 -25,-7 -7,-7" fill="#fff"/>
                <polygon points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5" fill="#cc142b"/>
              </g>
            </svg>

            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-medium border border-neutral-700 transition-all"
            >
              <span className={`inline-block ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Navigation Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCategory === cat ? 'bg-white text-black border-white' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chronological Event Feed Stream */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isDining = item.category === 'Places to Dine';
            return (
              <article key={item.id} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded border text-xs font-bold ${
                      isDining 
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {item.category}
                    </span>
                    <span>→</span>
                    <span className="text-neutral-400">{item.subCategory}</span>
                  </div>
                  <span className="text-amber-500 font-bold">{item.time}</span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h2>

                {item.imageUrl && <SafeFeedImage src={item.imageUrl} alt={item.title} />}

                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{point}</li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                  <span>Via <span className="font-semibold text-neutral-400">{item.source}</span></span>
                  <button 
                    onClick={(e) => handleLinkNavigation(e, item)}
                    className="text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium bg-transparent border-none cursor-pointer p-0"
                  >
                    {isDining ? 'View Menu ↗' : 'Book Tickets ↗'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
