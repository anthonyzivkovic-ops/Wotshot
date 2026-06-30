import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { fallbackFeedItems, categories, parseFeedDate } from './data';
import { redis } from './redisClient';

// Component to handle individual image rendering safely
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

export function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 Dynamic Live Event Fetcher & Flame Stitching Engine
  useEffect(() => {
    async function fetchLiveEvents() {
      try {
        setLoading(true);
        
        // Simulating background stream injection from your fallback matrix
        // (In the future, swap fallbackFeedItems for a fetch('your-api/events') call)
        const dynamicData = [...fallbackFeedItems]; 

        // Query your live Upstash Redis database hashmap to pull actual aggregated flame scores
        const liveFlamesMap = await redis.hgetall('wots_hot_live_scores');

        const updatedItems = dynamicData.map(item => {
          let databaseFlames = item.flames;
          if (liveFlamesMap && liveFlamesMap[item.id] !== undefined) {
            databaseFlames = parseInt(liveFlamesMap[item.id], 10);
          }
          return {
            ...item,
            flames: databaseFlames
          };
        });

        setFeedItems(updatedItems);
      } catch (err) {
        console.warn("Database sync resting, using baseline layout numbers:", err);
        setFeedItems(fallbackFeedItems);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveEvents();
  }, [isRefreshing]);

  // 🔥 Atomic increments write straight out live to everyone globally
  const handleFlameUp = async (id) => {
    // 1. Optimistic layout speed shift for immediate user feedback
    setFeedItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, flames: (item.flames || 0) + 1 } : item
      )
    );

    try {
      // 2. Fire atomic increment directly to the shared cloud database map
      await redis.hincrby('wots_hot_live_scores', id, 1);
    } catch (err) {
      console.error('Failed to dispatch live transaction:', err);
      // Rollback local state change if the network pipeline drops
      setFeedItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, flames: (item.flames || 0) - 1 } : item
        )
      );
    }
  };

  const getSortedItems = () => {
    if (activeCategory === 'Places to Dine') {
      return feedItems.filter(item => item.category === 'Places to Dine');
    }

    if (activeCategory !== 'All') {
      return feedItems
        .filter(item => item.category === activeCategory)
        .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));
    }

    const timedItems = feedItems
      .filter(item => item.category !== 'Places to Dine')
      .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));

    const diningItems = feedItems.filter(item => item.category === 'Places to Dine');

    return [...timedItems, ...diningItems];
  };

  const filteredItems = getSortedItems();

  const handleLinkNavigation = (item) => {
    const url = item.sourceUrl;
    const urlObj = new URL(url);
    if (urlObj.pathname === '/' && !urlObj.search) {
      const isDining = item.category === 'Places to Dine';
      const suffix = isDining ? 'restaurant menu new zealand' : 'tickets booking new zealand';
      const fallbackQuery = encodeURIComponent(`${item.title} ${suffix}`);
      window.open(`https://www.google.com/search?q=${fallbackQuery}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
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
            {/* NZ Flag */}
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
            </svg>

            <button 
              disabled={isRefreshing || loading}
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 400);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-xs font-medium border border-neutral-700 transition-all disabled:opacity-50"
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

        {/* Content Stream Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3 text-neutral-400">
            <span className="text-2xl animate-bounce">🔥</span>
            <p className="text-sm font-medium tracking-wide">Syncing real-time global events...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const isDining = item.category === 'Places to Dine';
              return (
                <article key={item.id} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm space-y-4 shadow-xl relative">
                  
                  {/* 🔴 LIVE CLOUD FLAME BUTTON */}
                  <button
                    onClick={() => handleFlameUp(item.id)}
                    className="absolute top-5 right-5 flex items-center gap-1 bg-orange-500/10 hover:bg-orange-500/20 active:scale-90 border border-orange-500/30 hover:border-orange-500/50 rounded-full px-2.5 py-1 text-xs font-bold text-orange-400 transition-all cursor-pointer"
                  >
                    <span>🔥</span>
                    <span>{item.flames || 0}</span>
                  </button>

                  <div className="flex items-center text-[11px] font-medium text-neutral-500 pr-16">
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
                    <span className="mx-2 text-neutral-700">•</span>
                    <span className="text-amber-500 font-bold">{item.time}</span>
                  </div>

                  <h2 className="text-lg font-bold text-white leading-snug tracking-tight pr-10">
                    {item.title}
                  </h2>

                  {item.imageUrl && <SafeFeedImage src={item.imageUrl} alt={item.title} />}

                  <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{point}</li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
                    <span>Source: <span className="font-semibold text-neutral-400">{item.source}</span></span>
                    <button 
                      onClick={() => handleLinkNavigation(item)}
                      className="text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium bg-transparent border-none cursor-pointer p-0 text-xs tracking-wide"
                    >
                      {isDining ? 'View Menu ↗' : 'Book Tickets ↗'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
