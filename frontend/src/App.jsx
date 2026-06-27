import './index.css';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layers, Globe2, Scale, Briefcase, Cpu, Clapperboard, Trophy, HeartPulse, RefreshCw, ExternalLink, Flame, Sparkles } from 'lucide-react';

const CATEGORY_LOGOS = {
  "All":           <Layers className="w-4 h-4" />,
  "World":         <Globe2 className="w-4 h-4 text-sky-400" />,
  "Politics":      <Scale className="w-4 h-4 text-purple-400" />,
  "Business":      <Briefcase className="w-4 h-4 text-emerald-400" />,
  "Technology":    <Cpu className="w-4 h-4 text-amber-400" />,
  "Entertainment": <Clapperboard className="w-4 h-4 text-pink-400" />,
  "Sports":        <Trophy className="w-4 h-4 text-yellow-400" />,
  "Health":        <HeartPulse className="w-4 h-4 text-red-400" />
};

export default function App() {
  const [packets, setPackets] = useState([]);
  const [trends, setTrends] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'https://wotshot-api.onrender.com';
      const [resPackets, resTrends] = await Promise.all([
        fetch(`${apiBase}/api/packets`),
        fetch(`${apiBase}/api/trends`)
      ]);
      setPackets(await resPackets.json());
      setTrends(await resTrends.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = activeCategory === 'All' ? packets : packets.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg text-slate-950"><Flame size={22} className="fill-slate-950" /></div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">WOT<span className="text-amber-500">SHOT</span></h1>
            <p className="text-xs text-slate-400 tracking-wide font-medium uppercase">Instant Intelligence Packets</p>
          </div>
        </div>
        <button onClick={fetchData} disabled={loading} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 transition-all text-sm px-4 py-2 rounded-lg border border-slate-800">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> {loading ? "Syncing..." : "Refresh"}
        </button>
      </header>

      {/* Spiking Ticker */}
      <div className="bg-slate-950 border-b border-slate-900 px-6 py-3 overflow-x-auto flex items-center gap-4 whitespace-nowrap">
        <div className="flex items-center gap-1.5 shrink-0 text-amber-500 font-bold uppercase text-xs border-r border-slate-900 pr-4"><Sparkles size={14} /> <span>Spiking:</span></div>
        <div className="flex gap-3">
          {trends.map((t, i) => (
            <span key={i} className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">#{i+1} {t}</span>
          ))}
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Navigation Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-900">
          {Object.keys(CATEGORY_LOGOS).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}>
              {CATEGORY_LOGOS[cat]} <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Intelligence Packet Cards Stream */}
        <div className="space-y-4">
          {filtered.map((packet, idx) => (
            <div key={packet.id || idx} className="bg-slate-900/50 border border-slate-900 rounded-xl p-5 space-y-4 hover:border-slate-800 transition-all">
              
              {/* Card Meta Header */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-semibold flex items-center gap-1.5">
                    {CATEGORY_LOGOS[packet.category] || <Layers className="w-3 h-3" />}
                    {packet.category}
                  </span>
                  {packet.subcategory && (
                    <span className="text-amber-400 font-medium px-1">
                      → {packet.subcategory}
                    </span>
                  )}
                </div>
                {packet.timestamp && (
                  <span className="text-[11px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    {packet.timestamp}
                  </span>
                )}
              </div>

              {/* Title & Bullet Points */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-100 leading-snug">{packet.title}</h3>
                {packet.summary_bullets && packet.summary_bullets.length > 0 && (
                  <ul className="space-y-2.5 pl-1">
                    {packet.summary_bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-400">
                <span>Via <strong className="text-slate-300">{packet.source || "Unknown"}</strong></span>
                {packet.link && (
                  <a href={packet.link} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition-colors">
                    Source <ExternalLink size={12} />
                  </a>
                )}
              </div>

            </div>
          ))}

          {/* Empty State */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-900 rounded-xl">
              <p className="text-sm text-slate-500">No intelligence packets found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Global mounting setup
setTimeout(() => {
  const container = document.getElementById('root');
  if (container && !container._reactRootContainer) {
    container._reactRootContainer = true;
    const root = createRoot(container);
    root.render(<App />);
  }
}, 0);
