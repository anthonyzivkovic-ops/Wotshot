import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Comprehensive Global Data Model with Image Integration
const initialEvents = [
  {
    id: 'e1',
    category: 'Events',
    subCategory: 'Concerts & Stadium Gigs',
    time: '04 Aug 2026', 
    title: 'The Neighbourhood: Live at Spark Arena',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Location: Auckland | Spark Arena.',
      'Massive global indie-rock headliners arrive in New Zealand for their highly anticipated world tour.',
      'Tickets moving fast via mainstream local booking platforms for this prime weekend event.'
    ],
    source: 'Ticketmaster NZ',
    sourceUrl: 'https://www.ticketmaster.co.nz'
  },
  {
    id: 'e2',
    category: 'Events',
    subCategory: 'Cinema Blockbusters',
    time: '09 Aug 2026', 
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz'
  },
  {
    id: 'e3',
    category: 'Events',
    subCategory: 'Live Music Festivals',
    time: '11 Aug 2026',
    title: 'Luude: Australasian Winter Tour Direct Hits',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10 dates).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz'
  },
  {
    id: 'e4',
    category: 'Events',
    subCategory: 'International Football',
    time: '26 Aug 2026',
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  },
  {
    id: 'e5',
    category: 'Events',
    subCategory: 'Live Theatre & Musicals',
    time: '22 Oct 2026',
    title: 'Wicked The Musical: Star-Studded Civic Run',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Location: Auckland | The Civic Theatre.',
      'The legendary Broadway production lands in Auckland for a strictly limited four-week regional season.',
      'Corporate hospitality suites and weekend matinee allocations opening to the public early.'
    ],
    source: 'Auckland Live',
    sourceUrl: 'https://www.aucklandlive.co.nz'
  }
];

const initialPackets = [
  // GLOBAL SPORTS
  {
    id: 's1',
    category: 'Sports',
    subCategory: 'Basketball - NBA',
    time: '5m ago',
    title: 'NBA Finals: Underdog Franchise Clinches Championship Title in Game 7 Thriller',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    points: [
      'A thrilling buzzer-beater shot in the final seconds seals a historic comeback victory to claim the trophy.',
      'The finals MVP breaks tournament records for the highest total point contribution in a closing series.',
      'Parade routes and celebratory schedules are finalized as fans flood metropolitan areas globally.'
    ],
    source: 'ESPN',
    sourceUrl: 'https://www.espn.com'
  },
  {
    id: 's2',
    category: 'Sports',
    subCategory: 'Tennis - Grand Slam',
    time: '12m ago',
    title: 'Wimbledon: Top Seed Overcomes Injury to Secure Grand Slam Title',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80',
    points: [
      'The multi-hour baseline duel ends in an absolute classic five-set tiebreaker on Center Court.',
      'Medical staff cleared minor knee strains during an intense third-set tactical intermission.',
      'The global rankings list officially cements the champion at the world number one spot.'
    ],
    source: 'BBC Sport',
    sourceUrl: 'https://www.bbc.com/sport'
  },
  {
    id: 's3',
    category: 'Sports',
    subCategory: 'Football - UEFA',
    time: '45m ago',
    title: 'Champions League: Tactical Masterclass Books Spot in European Grand Final',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d445bccb59?auto=format&fit=crop&w=1200&q=80',
    points: [
      'A late second-half counter-attacking structure breaks down a stubborn defensive backline configuration.',
      'Club executives confirm historic broadcast viewership figures across global streaming networks.',
      'The grand final venue initiates premium stadium preparations ahead of next month\'s fixture.'
    ],
    source: 'Sky Sports',
    sourceUrl: 'https://www.skysports.com'
  },

  // ENTERTAINMENT
  {
    id: 'en1',
    category: 'Entertainment',
    subCategory: 'Streaming & Media',
    time: 'Just Now',
    title: 'Major International Reality Franchise Confirms Upcoming New Zealand Season',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Production crews slate location scouting across Queenstown and Auckland for late next month.',
      'Local network executives hint at an unprecedented celebrity casting lineup to maximize domestic ratings.',
      'The broadcast deal secures a prime-time slot alongside concurrent streaming drops on local platforms.'
    ],
    source: 'NZ Herald',
    sourceUrl: 'https://www.nzherald.co.nz'
  },
  {
    id: 'en2',
    category: 'Entertainment',
    subCategory: 'Music Production',
    time: '34m ago',
    title: 'Global Pop Icon Unveils Secret Conceptual Studio Album Drop',
    imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1200&q=80',
    points: [
      'The experimental multi-genre collection breaks top daily streaming records within two hours of launch.',
      'Collaborations feature iconic classical instrumentation paired with modern electronic bass tracks.',
      'World stadium tour ticket distributions are projected to rollout via major apps tomorrow.'
    ],
    source: 'Rolling Stone',
    sourceUrl: 'https://www.rollingstone.com'
  },

  // GLOBAL WORLD NEWS
  {
    id: 'w1',
    category: 'World',
    subCategory: 'Space Exploration',
    time: '1h ago',
    title: 'Deep Space Mission Transmits Historic Atmospheric Data From Outer System',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    points: [
      'The automated deep-space probe successfully clears complex outer planetary ring layers.',
      'Telemetry verifies high concentrations of methane ice structures inside distant cloud ceilings.',
      'Global aerospace networks hail the breakthrough dataset as a vital pillar for next-generation propulsion models.'
    ],
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com'
  },
  {
    id: 'w2',
    category: 'World',
    subCategory: 'Global Trade Infrastructure',
    time: '3h ago',
    title: 'International Maritime Canals Implement Smart Fleet Routing Automation',
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Major global trade checkpoints deploy real-time digital scheduling algorithms to avoid container delays.',
      'Supply chain analysts project transit efficiency windows to improve significantly across oceanic routes.',
      'Fuel resource pricing models react favorably as shipping bottleneck configurations drop globally.'
    ],
    source: 'Bloomberg',
    sourceUrl: 'https://www.bloomberg.com'
  },

  // BUSINESS
  {
    id: 'b1',
    category: 'Business',
    subCategory: 'Retail & Economy',
    time: '1h ago',
    title: 'Domestic Fuel Pricing Trends Reflect Shifts Across Local Terminals',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    points: [
      'Regional price variations stabilize slightly as localized competition patterns adjust.',
      'Industry analysts track ongoing supply chain optimization strategies within national reserves.',
      'Consumer advocacy groups recommend utilizing tracking apps to target optimal refueling windows.'
    ],
    source: 'Interest.co.nz',
    sourceUrl: 'https://www.interest.co.nz'
  }
];

const categories = ['All', 'Events', 'Entertainment', 'Sports', 'Business', 'World'];

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState([...initialEvents, ...initialPackets]);

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

  const handleLinkNavigation = (e, item) => {
    e.preventDefault();
    if (!item.sourceUrl || item.sourceUrl === '#') {
      const query = encodeURIComponent(`${item.title} News`);
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
            {/* New Zealand Flag Badge */}
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
            return (
              <article key={item.id} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl">
                {/* Meta Header */}
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

                {/* Story Title */}
                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h2>

                {/* 📸 Representative Image Element - Framed right below headline as seen in image.png */}
                {item.imageUrl && (
                  <div className="my-3.5 overflow-hidden rounded-lg border border-neutral-800/80 bg-neutral-950">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-48 sm:h-56 object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Bullet Points */}
                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{point}</li>
                  ))}
                </ul>

                {/* Bottom Source Bar */}
                <div className="pt-3 border-t border-neutral-800/60 flex items-center text-xs text-neutral-500">
                  <span>Via <span className="font-semibold text-neutral-400">{item.source}</span></span>
                  <button 
                    onClick={(e) => handleLinkNavigation(e, item)}
                    className="ml-3 text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium bg-transparent border-none cursor-pointer p-0"
                  >
                    {item.category === 'Events' ? 'Book Tickets ↗' : 'Source ↗'}
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
