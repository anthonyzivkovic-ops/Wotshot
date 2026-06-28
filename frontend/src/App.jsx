import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const getDynamicDateLabel = (baseDay, monthsAhead) => {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsAhead);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${baseDay} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// Clean Base Data Model
const initialEvents = [
  {
    id: 'e1',
    category: 'Events',
    subCategory: 'Concerts & Stadium Gigs',
    time: getDynamicDateLabel(4, 1), 
    title: 'The Neighbourhood: Live at Spark Arena',
    points: [
      'Location: Auckland | Spark Arena.',
      'Massive global indie-rock headliners arrive in New Zealand for their highly anticipated world tour.',
      'Tickets moving fast via mainstream local booking platforms for this prime weekend event.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz',
    baseFlames: 120
  },
  {
    id: 'e2',
    category: 'Events',
    subCategory: 'Cinema Blockbusters',
    time: getDynamicDateLabel(9, 1), 
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz',
    baseFlames: 85
  },
  {
    id: 'e3',
    category: 'Events',
    subCategory: 'Live Music Festivals',
    time: getDynamicDateLabel(11, 1),
    title: 'Luude: Australasian Winter Tour Direct Hits',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10 dates).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz',
    baseFlames: 214
  },
  {
    id: 'e4',
    category: 'Events',
    subCategory: 'International Football',
    time: getDynamicDateLabel(26, 1),
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz',
    baseFlames: 450
  }
];

const initialPackets = [
  {
    id: 'p1',
    category: 'Entertainment',
    subCategory: 'Streaming & Media',
    time: 'Just Now',
    title: 'Major International Reality Franchise Confirms Upcoming New Zealand Season',
    points: [
      'Production crews slate location scouting across Queenstown and Auckland for late next month.',
      'Local network executives hint at an unprecedented celebrity casting lineup to maximize domestic ratings.',
      'The broadcast deal secures a prime-time slot alongside concurrent streaming drops on local platforms.'
    ],
    source: 'NZ Herald',
    sourceUrl: 'https://www.nzherald.co.nz',
    baseFlames: 63
  },
  {
    id: 'p2',
    category: 'Sports',
    subCategory: 'Rugby Union',
    time: '12m ago',
    title: 'All Blacks Squad Adjusts Training Workloads Ahead of Crucial Test Match',
    points: [
      'Coaching staff implements specialized high-intensity tactical drills focusing on set-piece execution.',
      'Key playmakers clear final fitness protocols following minor training-ground knocks.',
      'Ticket sales across major regional stadiums see a rapid surge as match-day security parameters are finalized.'
    ],
    source: 'Stuff.co.nz',
    sourceUrl: 'https://www.stuff.co.nz',
    baseFlames: 510
  }
];

const categories = ['All', 'Events', 'Entertainment', 'Sports', 'Business', 'World'];

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState([...initialEvents, ...initialPackets]);

  // Live Counter Management (Stored in localStorage for persistent counts)
  const [flameRegistry, setFlameRegistry] = useState(() => {
    const saved = localStorage.getItem('wots_hot_flames_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed parsing live storage records", e);
      }
    }
    
    const initialMap = {};
    initialEvents.forEach(item => { initialMap[item.id] = { count: item.baseFlames, clicked: false }; });
    initialPackets.forEach(item => { initialMap[item.id] = { count: item.baseFlames, clicked: false }; });
    return initialMap;
  });

  useEffect(() => {
    localStorage.setItem('wots_hot_flames_v1', JSON.stringify(flameRegistry));
  }, [flameRegistry]);

  const filteredItems = activeCategory === 'All'
    ? feedItems
    : feedItems.filter(item => item.category === activeCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const shuffled = [...feedItems].sort(() => Math.random() - 0.5);
      setFeedItems(shuffled);
      setIsRefreshing(false);
    }, 600);
  };

  const handleFlameUp = (id) => {
    setFlameRegistry(prev => {
      const record = prev[id] || { count: 0, clicked: false };
      if (record.clicked) return prev; 
      return {
        ...prev,
        [id]: { count: record.count + 1, clicked: true }
      };
    });
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
            {/* Full-Color New Zealand Flag */}
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
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeCategory === cat ? 'bg-white text-black border-white' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic List Stream */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const registryRecord = flameRegistry[item.id] || { count: 0, clicked: false };
            const hasUserClicked = registryRecord.clicked;
            const liveTotalFlames = registryRecord.count;

            return (
              <article key={item.id} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded border text-xs font-bold ${
                      item.category === 'Events' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-neutral-800 text-neutral-300 border-neutral-700/50'
                    }`}>
                      {item.category}
                    </span>
                    <span>→</span>
                    <span className="text-neutral-400">{item.subCategory}</span>
                  </div>
                  <span className={item.category === 'Events' ? 'text-amber-500 font-bold' : ''}>{item.time}</span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h2>

                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{point}</li>
                  ))}
                </ul>

                {/* Bottom Bar Controls Container */}
                <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                  <div>
                    <span>Via <span className="font-semibold text-neutral-400">{item.source}</span></span>
                    <button 
                      onClick={(e) => handleLinkNavigation(e, item)}
                      className="ml-3 text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium bg-transparent border-none cursor-pointer p-0"
                    >
                      {item.category === 'Events' ? 'Book Tickets ↗' : 'Source ↗'}
                    </button>
                  </div>

                  {/* Flame Counter */}
                  <button
                    onClick={() => handleFlameUp(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold tracking-tight select-none transition-all duration-200 transform active:scale-95 ${
                      hasUserClicked 
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-lg shadow-orange-500/10' 
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{hasUserClicked ? '🔥 Lit!' : '🔥 Light It Up'}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      hasUserClicked ? 'bg-orange-500 text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {liveTotalFlames.toLocaleString()}
                    </span>
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
