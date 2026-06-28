import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Helper function to dynamically calculate upcoming months relative to current date
const getDynamicDateLabel = (baseDay, monthsAhead) => {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsAhead);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${baseDay} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// Expanded Mass-Market Events Grid across Auckland, Wellington & Christchurch
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
    sourceUrl: '#'
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
    sourceUrl: '#'
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
    sourceUrl: '#'
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
    sourceUrl: '#'
  },
  {
    id: 'e5',
    category: 'Events',
    subCategory: 'Major Sports Showcase',
    time: getDynamicDateLabel(8, 2), 
    title: 'Chelsea FC Women vs Auckland FC Women Historic Match',
    points: [
      'Location: Auckland | Eden Park.',
      'Women’s Super League champions Chelsea FC face New Zealand’s newest squad in an elite international showcase.',
      'Doubleheader configurations and hospitality packages open to mass-market public booking pipelines.'
    ],
    source: 'Eden Park Events',
    sourceUrl: '#'
  },
  {
    id: 'e6',
    category: 'Events',
    subCategory: 'Concerts & Gigs',
    time: getDynamicDateLabel(12, 2),
    title: 'Laufey: A Matter of Time Tour NZ Debut',
    points: [
      'Location: Auckland | Spark Arena.',
      'The Grammy-winning vocal sensation brings her highly anticipated debut arena production to Kiwi fans.',
      'Final ticket allocations re-released following unprecedented early registration demand.'
    ],
    source: 'Heart of the City',
    sourceUrl: '#'
  },
  {
    id: 'e7',
    category: 'Events',
    subCategory: 'Live Theatre & Musicals',
    time: getDynamicDateLabel(18, 1),
    title: 'The Book of Mormon – Limited Regional Run',
    points: [
      'Location: Wellington | St James Theatre.',
      'The Broadway smash-hit musical returns to New Zealand for an exclusive, highly energetic short season.',
      'Massive appeal for local theatergoers; weekend evening shows tracking near capacity.'
    ],
    source: 'Ticketek New Zealand',
    sourceUrl: '#'
  },
  {
    id: 'e8',
    category: 'Events',
    subCategory: 'Community Festivals',
    time: getDynamicDateLabel(22, 2),
    title: 'Beervana 2026 National Craft Showcase',
    points: [
      'Location: Wellington | Sky Stadium.',
      'New Zealand’s premier culinary and brewing festival locks in over 60 independent regional hubs.',
      'Standard entry tickets include commemorative tasting kits and access to live music stages.'
    ],
    source: 'WellingtonNZ',
    sourceUrl: '#'
  },
  {
    id: 'e9',
    category: 'Events',
    subCategory: 'Family & Exhibition',
    time: getDynamicDateLabel(29, 1),
    title: 'The Great Christchurch Brick Show 2026',
    points: [
      'Location: Christchurch | Wolfbrook Arena.',
      'The largest LEGO display in the South Island returns, featuring custom builds from over 200 global exhibitors.',
      'A massive weekend drawcard for families and casual collectors alike.'
    ],
    source: 'ChristchurchNZ',
    sourceUrl: '#'
  }
];

// Expanded Hyper-Relevant New Zealand News & Lifestyle Feed
const initialPackets = [
  {
    id: 1,
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
    sourceUrl: '#'
  },
  {
    id: 2,
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
    sourceUrl: '#'
  },
  {
    id: 3,
    category: 'Entertainment',
    subCategory: 'Music & Events',
    time: '34m ago',
    title: 'Massive Summer Music Festival Announces First Wave Local Lineup',
    points: [
      'Top-charting New Zealand electronic and indie acts locked in for multi-city outdoor dates.',
      'Early-bird registration sets a new record baseline for regional event demand.',
      'Organizers introduce enhanced logistics partnerships to streamline transit routes to festival grounds.'
    ],
    source: 'UnderTheRadar',
    sourceUrl: '#'
  },
  {
    id: 4,
    category: 'Business',
    subCategory: 'Retail & Economy',
    time: '1h ago',
    title: 'Domestic Fuel Pricing Trends Reflect Shifts Across Local Terminals',
    points: [
      'Regional price variations stabilize slightly as localized competition patterns adjust.',
      'Industry analysts track ongoing supply chain optimization strategies within national reserves.',
      'Consumer advocacy groups recommend utilizing tracking apps to target optimal refueling windows.'
    ],
    source: 'Interest.co.nz',
    sourceUrl: '#'
  },
  {
    id: 5,
    category: 'World',
    subCategory: 'Pacific Aviation',
    time: '2h ago',
    title: 'Trans-Tasman Airline Routes Expand Fleet Capacities for Peak Travel',
    points: [
      'Carriers deploy larger wide-body aircraft to accommodate high-volume commuter corridors.',
      'Competitive airfare pricing frameworks introduced for early booking allocations.',
      'Airport hubs scale up frontline self-service customs kiosks to accelerate passenger processing.'
    ],
    source: 'Radio New Zealand',
    sourceUrl: '#'
  },
  {
    id: 6,
    category: 'Technology',
    subCategory: 'Digital Infrastructure',
    time: '3h ago',
    title: 'Hyper-Scale Cloud Data Center officially Powers Up Infrastructure Hub',
    points: [
      'The multi-million dollar local facility goes live to support enterprise-grade digital services.',
      'Architecture features localized backup arrays to maximize up-time against regional interruptions.',
      'Tech sectors forecast expanded operational capacities for local software development pipelines.'
    ],
    source: 'NBR',
    sourceUrl: '#'
  },
  {
    id: 7,
    category: 'Politics',
    subCategory: 'Local Government',
    time: '4h ago',
    title: 'Regional Council Outlines Infrastructure Financing Frameworks',
    points: [
      'Capital allocation priorities focus on long-term roading resilience and public facility upgrades.',
      'Community consultation periods open to gather feedback on proposed rate adjustments.',
      'Collaborative funding partnerships with national transport agencies formalised for key corridors.'
    ],
    source: 'The Spinoff',
    sourceUrl: '#'
  },
  {
    id: 8,
    category: 'Business',
    subCategory: 'Commercial Property',
    time: '5h ago',
    title: 'Auckland and Christchurch Commercial Hubs Post Historic Construction Surges',
    points: [
      'Premium inner-city spaces observe accelerated fit-out completions ahead of Q3 leasing updates.',
      'High sustainability green-star compliance ratings become mandatory baselines for commercial builds.',
      'Investor portfolios tilt heavily toward tech-integrated flexible layouts.'
    ],
    source: 'NBR',
    sourceUrl: '#'
  },
  {
    id: 9,
    category: 'Technology',
    subCategory: 'Cybersecurity',
    time: '6h ago',
    title: 'National Cyber Security Center Warns Businesses of New Phishing Protocol',
    points: [
      'Advanced multi-stage social engineering campaigns target medium-sized corporate accounting teams.',
      'IT networks issue swift multi-factor hardware key updates to secure remote client endpoints.',
      'Staff awareness briefings standardise simulation training cycles across banking pipelines.'
    ],
    source: 'Geekzone',
    sourceUrl: '#'
  },
  {
    id: 10,
    category: 'World',
    subCategory: 'Global Logistics',
    time: '7h ago',
    title: 'Global Maritime Shipping Rates Stabilise Across Key Pacific Trade Lanes',
    points: [
      'Container backlogs clear efficiently at major deepwater transshipment ports.',
      'Freight operators optimize seasonal schedules to minimize global carbon offset surcharges.',
      'Importers report more predictable supply chains heading into peak spring retail stocking.'
    ],
    source: 'Reuters',
    sourceUrl: '#'
  },
  {
    id: 11,
    category: 'Sports',
    subCategory: 'Basketball',
    time: '8h ago',
    title: 'National Basketball League Final Series Tickets Sell Out Instantly',
    points: [
      'Unprecedented rush crashes online queues within seven minutes of public launch windows.',
      'Championship rivalries hit peak momentum with local rosters reporting clean health clearances.',
      'Broadcast syndicates expand coverage to auxiliary free-to-air local channels.'
    ],
    source: 'Sky Sport NZ',
    sourceUrl: '#'
  }
];

const categories = ['All', 'Events', 'Entertainment', 'Sports', 'Business', 'World', 'Technology', 'Politics'];

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [packets, setPackets] = useState(initialPackets);
  const [events, setEvents] = useState(initialEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayItems = activeCategory === 'All'
    ? [...events, ...packets]
    : activeCategory === 'Events'
      ? events
      : packets.filter(p => p.category === activeCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const shuffledPackets = [...packets].sort(() => Math.random() - 0.5);
      const shuffledEvents = [...events].sort(() => Math.random() - 0.5);
      setPackets(shuffledPackets);
      setEvents(shuffledEvents);
      setIsRefreshing(false);
    }, 600);
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
          
          <div className="flex items-center gap-3">
            {/* Full-Color New Zealand Flag */}
            <svg 
              className="w-8 h-5 shadow-md border border-neutral-800 rounded-sm" 
              viewBox="0 0 600 300" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="New Zealand Flag"
            >
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
              <g transform="translate(390, 140) scale(0.5)">
                <polygon points="0,-25 7,-7 25,-7 10,4 15,22 0,11 -15,22 -10,4 -25,-7 -7,-7" fill="#fff"/>
                <polygon points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5" fill="#cc142b"/>
              </g>
              <g transform="translate(505, 125) scale(0.55)">
                <polygon points="0,-25 7,-7 25,-7 10,4 15,22 0,11 -15,22 -10,4 -25,-7 -7,-7" fill="#fff"/>
                <polygon points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5" fill="#cc142b"/>
              </g>
            </svg>

            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-medium border border-neutral-700 transition-all disabled:opacity-50"
            >
              <span className={`inline-block ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
            What's <span className="text-orange-500">Hot</span> & What's New...
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border snap-start ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Display Feed */}
        <div className="space-y-4">
          {displayItems.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-neutral-800 bg-neutral-900/20 text-neutral-500 text-sm">
              No recent entries found in this selection.
            </div>
          ) : (
            displayItems.map((item) => (
              <article 
                key={item.id} 
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded border text-xs font-bold ${
                      item.category === 'Events' 
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700/50'
                    }`}>
                      {item.category}
                    </span>
                    <span>→</span>
                    <span className="text-neutral-400">{item.subCategory}</span>
                  </div>
                  <span className={item.category === 'Events' ? 'text-amber-500 font-bold' : ''}>
                    {item.time}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h2>

                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                  <span>Via <span className="font-semibold text-neutral-400">{item.source}</span></span>
                  <a href={item.sourceUrl} className="text-amber-500 hover:underline flex items-center gap-0.5 font-medium">
                    {item.category === 'Events' ? 'Book Tickets ↗' : 'Source ↗'}
                  </a>
                </div>
              </article>
            ))
          )}
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
