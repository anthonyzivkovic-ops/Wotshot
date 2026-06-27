import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Hyper-relevant New Zealand & mass-market data feed
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
  }
];

const categories = ['All', 'Entertainment', 'Sports', 'Business', 'World', 'Technology', 'Politics'];

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [packets, setPackets] = useState(initialPackets);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredPackets = activeCategory === 'All'
    ? packets
    : packets.filter(p => p.category === activeCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const shuffled = [...packets].sort(() => Math.random() - 0.5);
      setPackets(shuffled);
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
          
          <div className="flex items-center gap-4">
            {/* Minimalist White SVG Map of New Zealand */}
            <svg 
              className="w-7 h-10 text-white fill-current opacity-85" 
              viewBox="0 0 100 150" 
              aria-label="New Zealand Map"
            >
              {/* North Island */}
              <path d="M62,12 C58,15 52,22 55,26 C57,29 65,24 67,27 C70,32 55,42 58,47 C60,50 69,42 73,44 C78,46 72,56 68,58 C62,61 54,49 46,51 C40,53 43,60 41,65 C38,72 26,65 24,72 C22,78 30,81 33,86 C36,90 32,96 36,99 C40,102 46,95 49,91 C53,86 59,88 64,83 C68,78 69,67 73,63 C78,57 87,46 84,38 C82,32 73,34 71,28 C70,22 76,17 73,11 C70,6 64,8 62,12 Z" />
              {/* South Island */}
              <path d="M21,95 C17,98 12,106 15,111 C18,116 26,114 27,119 C28,125 18,133 22,138 C25,142 35,138 39,141 C43,143 42,148 48,146 C56,143 62,131 60,123 C58,116 48,115 47,108 C46,102 52,95 48,91 C43,87 36,95 31,93 C27,91 24,93 21,95 Z" />
              {/* Stewart Island */}
              <path d="M21,143 C20,144 19,147 21,148 C23,149 25,146 25,145 C24,143 22,142 21,143 Z" />
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

        {/* Intelligence Feed List */}
        <div className="space-y-4">
          {filteredPackets.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-neutral-800 bg-neutral-900/20 text-neutral-500 text-sm">
              No updates found in this category.
            </div>
          ) : (
            filteredPackets.map((packet) => (
              <article 
                key={packet.id} 
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                      {packet.category}
                    </span>
                    <span>→</span>
                    <span className="text-neutral-400">{packet.subCategory}</span>
                  </div>
                  <span>{packet.time}</span>
                </div>

                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {packet.title}
                </h2>

                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {packet.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                  <span>Via <span className="font-semibold text-neutral-400">{packet.source}</span></span>
                  <a href={packet.sourceUrl} className="text-amber-500 hover:underline flex items-center gap-0.5 font-medium">
                    Source ↗
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

// Explicitly mount to the DOM right here
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
