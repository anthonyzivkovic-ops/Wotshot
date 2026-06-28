import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { initialFeedItems, categories, parseFeedDate } from './data';

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

  const getSortedItems = () => {
    if (activeCategory === 'Places to Dine') {
      return initialFeedItems.filter(item => item.category === 'Places to Dine');
    }

    if (activeCategory !== 'All') {
      return initialFeedItems
        .filter(item => item.category === activeCategory)
        .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));
    }

    // "All" tab view pipeline split logic
    const timedItems = initialFeedItems
      .filter(item => item.category !== 'Places to Dine')
      .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));

    const diningItems = initialFeedItems.filter(item => item.category === 'Places to Dine');

    return [...timedItems, ...diningItems];
  };

  const filteredItems = getSortedItems();

  const handleLinkNavigation = (url) => {
    if (url && url !== '#') {
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
              disabled={isRefreshing}
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 300);
              }}
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
                  <span>Source: <span className="font-semibold text-neutral-400">{item.source}</span></span>
                  <button 
                    onClick={() => handleLinkNavigation(item.sourceUrl)}
                    className="text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium bg-transparent border-none cursor-pointer p-0 text-xs tracking-wide"
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
