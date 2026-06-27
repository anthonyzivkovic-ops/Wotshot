import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Massive realistic intelligence feed
const initialPackets = [
  {
    id: 1,
    category: 'Technology',
    subCategory: 'Artificial Intelligence',
    time: 'Just Now',
    title: 'Next-Gen LLMs Introduce Native Multimodal Processing',
    points: [
      'New architectures process live video feeds and speech natively without external transcription tools.',
      'Token efficiency has improved by 40%, reducing operational inference costs significantly.',
      'Context windows expand up to 2 million tokens across major cloud deployment endpoints.'
    ],
    source: 'TechCrunch',
    sourceUrl: '#'
  },
  {
    id: 2,
    category: 'Business',
    subCategory: 'Global Markets',
    time: '14m ago',
    title: 'Industrial Supply Chains Shift Toward Nearshoring Initiatives',
    points: [
      'Manufacturing firms increase capital allocation for regional logistics infrastructure.',
      'Automation integration balances higher local labor costs in domestic facilities.',
      'Just-in-time inventory models are being replaced by resilient strategic buffering.'
    ],
    source: 'Bloomberg',
    sourceUrl: '#'
  },
  {
    id: 3,
    category: 'Business',
    subCategory: 'Energy Sector',
    time: '45m ago',
    title: 'Green Hydrogen Infrastructure Gains Major Industrial Backing',
    points: [
      'New production facilities receive $1.2B in joint private-public infrastructure bonds.',
      'Next-generation electrolyzers achieve a baseline 78% thermodynamic efficiency rating.',
      'Heavy transport fleets outline multi-year adoption roadmaps starting late Q3.'
    ],
    source: 'Reuters',
    sourceUrl: '#'
  },
  {
    id: 4,
    category: 'World',
    subCategory: 'Trade Logistics',
    time: '1h ago',
    title: 'Global Maritime Routes Face Increased Congestion at Key Chokepoints',
    points: [
      'Alternative rail corridors see a 22% spike in volume as shipping lines seek bypasses.',
      'Freight insurance premiums adjust upward reflecting prolonged transit timelines.',
      'Port authority automation updates deployed to accelerate customs processing.'
    ],
    source: 'Financial Times',
    sourceUrl: '#'
  },
  {
    id: 5,
    category: 'Politics',
    subCategory: 'Regulation',
    time: '2h ago',
    title: 'Cross-Border Data Privacy Frameworks Enter Enforcement Phase',
    points: [
      'New compliance mandates impose strict operational localization on user analytics.',
      'Enterprise cloud platforms deploy automated sovereign boundary guardrails.',
      'Non-compliance penalties structured to scale directly with global gross revenue.'
    ],
    source: 'The Wall Street Journal',
    sourceUrl: '#'
  },
  {
    id: 6,
    category: 'Technology',
    subCategory: 'Hardware & Silicon',
    time: '3h ago',
    title: 'Sub-2nm Semiconductor Fab Facilities Begin Pilot Run Production',
    points: [
      'Advanced High-NA EUV lithography systems achieve stable operational uptime.',
      'Thermal dissipation thresholds improved by 15% using composite diamond substrates.',
      'Initial wafer yields meet baseline requirements for early enterprise validation.'
    ],
    source: 'EETimes',
    sourceUrl: '#'
  },
  {
    id: 7,
    category: 'Entertainment',
    subCategory: 'Digital Media',
    time: '4h ago',
    title: 'Streaming Ecosystems Shift Monetization Toward Hybrid Tiers',
    points: [
      'Premium ad-supported subscriptions surpass traditional pure-play models in growth.',
      'Licensing agreements pivot back to non-exclusive syndication networks.',
      'Interactive community-driven content formats see increased production funding.'
    ],
    source: 'Variety',
    sourceUrl: '#'
  },
  {
    id: 8,
    category: 'Sports',
    subCategory: 'Analytics',
    time: '5h ago',
    title: 'Biometric Tracking Integration Approved for Professional Leagues',
    points: [
      'Real-time physiological telemetry to be integrated directly into broadcast streams.',
      'Collective bargaining agreements establish strict data ownership boundaries for athletes.',
      'Predictive injury prevention algorithms adopted by top-tier medical staffs.'
    ],
    source: 'ESPN',
    sourceUrl: '#'
  }
];

const categories = ['All', 'World', 'Politics', 'Business', 'Technology', 'Entertainment', 'Sports'];

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
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-50 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
  <span className="text-xl">🔥</span>
  <h1 className="text-xl font-black tracking-wider text-white">
    WOTS-<span className="text-orange-500">HOT</span>
  </h1>
</div>

          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-medium border border-neutral-700 transition-all disabled:opacity-50"
          >
            <span className={`inline-block ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Instant Intelligence Packets</p>
        </div>

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

        <div className="space-y-4">
          {filteredPackets.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-neutral-800 bg-neutral-900/20 text-neutral-500 text-sm">
              No intelligence packets found in this category.
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
