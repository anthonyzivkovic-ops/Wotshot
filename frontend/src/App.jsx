import React, { useState, useEffect } from 'react';
import { categories, generateDynamicFeeds, parseFeedDate } from './data';

export function App() {
  const [feedItems, setFeedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const triggerFreshDataLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      const simulatedData = generateDynamicFeeds();
      setFeedItems(simulatedData);
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    triggerFreshDataLoad();
  }, []);

  const filteredItems = feedItems
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
      <header className="border-b border-neutral-800 bg-neutral-900/80 sticky top-0 z-50 px-4 py-4 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black tracking-wider text-white">
            WOTS-<span className="text-orange-500">HOT</span>
          </h1>
          <button 
            onClick={triggerFreshDataLoad}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold border border-neutral-700 transition-all active:scale-95 cursor-pointer"
          >
            🔄 Simulate Live Scrape
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400 space-y-2">
            <span className="text-xl animate-spin">🔄</span>
            <p className="text-sm font-medium">Scraping regional event tickets streams...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <article key={item.id} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4 relative shadow-2xl">
                <div className="flex items-center text-[11px] font-bold text-neutral-500 gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase text-[10px]">
                    {item.category}
                  </span>
                  <span>•</span>
                  <span className="text-neutral-400">{item.subCategory}</span>
                  <span>•</span>
                  <span className="text-orange-400">{item.time}</span>
                </div>

                <h2 className="text-lg font-extrabold text-white leading-snug">
                  {item.title}
                </h2>

                <div className="overflow-hidden rounded-lg bg-neutral-900 aspect-video w-full">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-90" />
                </div>

                <ul className="space-y-2 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-700">
                  {item.points.map((pt, idx) => (
                    <li key={idx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                  <span>Source: <span className="font-semibold text-neutral-400">{item.source}</span></span>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-amber-500 font-bold hover:underline">
                    Book Tickets ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
