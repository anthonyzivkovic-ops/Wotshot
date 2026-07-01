import React, { useState, useEffect } from 'react';
import { categories, fallbackFeedItems } from './data';

function App() {
  const [feedItems, setFeedItems] = useState(fallbackFeedItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Live Sync Engine - Prepped for when your automated backend pipeline goes live
  useEffect(() => {
    async function syncLatestEvents() {
      // Set to true if you are actively debugging your deployed database routing
      const isBackendConfigured = false; 
      
      if (!isBackendConfigured) return;

      try {
        setIsLoading(true);
        // Replace with your actual backend Render URL when server.js is deployed
        const response = await fetch('https://your-backend-api-url.render.com/api/feeds');
        if (!response.ok) throw new Error('Network stream sync interrupted.');
        const freshData = await response.json();
        if (freshData && freshData.length > 0) {
          setFeedItems(freshData);
        }
      } catch (err) {
        console.error("Database fallback active:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    syncLatestEvents();
  }, []);

  // Filter content instantly by category
  const filteredItems = selectedCategory === 'All'
    ? feedItems
    : feedItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight text-red-600 flex items-center gap-1">
            🔥 WHAT'S HOT
          </h1>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
            {feedItems.length} Stories Loaded
          </span>
        </div>
      </header>

      {/* Scannable Category Filter Bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-200 shadow-xs overflow-x-auto scrollbar-none">
        <div className="max-w-2xl mx-auto px-4 py-3 flex gap-2 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-xs scale-102'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Feed Area */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {isLoading && (
          <div className="text-center py-12 text-gray-500 font-medium animate-pulse">
            Syncing fresh content streams...
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <p className="text-gray-500 font-medium">No fresh updates in {selectedCategory} right now.</p>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <article 
                key={item.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                {/* Card Top Information Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-red-50 text-red-600 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs font-medium text-gray-400">•</span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                      {item.subCategory}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                    <span>{item.time}</span>
                  </div>
                </div>

                {/* Main Visual Asset Section */}
                {item.imageUrl && (
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform hover:scale-101 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm">
                      🔥 {item.flames}
                    </div>
                  </div>
                )}

                {/* Core Text Content Block */}
                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-extrabold text-gray-900 leading-snug hover:text-red-600 transition-colors duration-150">
                    {item.title}
                  </h2>
                  
                  {/* Clean bullet points layout */}
                  <ul className="space-y-2">
                    {item.points && item.points.map((pt, idx) => (
                      <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                        <span className="text-red-500 mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Source Validation Bar */}
                {item.source && (
                  <div className="px-4 py-3 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Source: {item.source}
                    </span>
                    {item.sourceUrl && (
                      <a 
                        href={item.sourceUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-colors"
                      >
                        Verify Live Ticket Info →
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
