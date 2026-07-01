import React, { useState, useEffect } from 'react';

// Clean embedded styling layout
const embeddedStyles = `
  .wots-bg { background-color: #0a0a0a; color: #f5f5f5; font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; }
  .wots-header { border-bottom: 1px solid #262626; background-color: rgba(23, 23, 23, 0.8); position: sticky; top: 0; z-index: 50; padding: 1rem; backdrop-filter: blur(8px); }
  .wots-container { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem; }
  .wots-title { font-size: 1.25rem; font-weight: 900; color: #ffffff; margin: 0; }
  .wots-orange { color: #f97316; }
  .wots-btn-refresh { display: flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; background-color: #262626; border: 1px solid #404040; color: #f5f5f5; font-size: 0.75rem; font-weight: 700; cursor: pointer; border-radius: 6px; }
  .wots-btn-refresh:hover { background-color: #404040; }
  .wots-filter-row { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
  .wots-filter-row::-webkit-scrollbar { display: none; }
  .wots-filter-btn { padding: 0.375rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; border: 1px solid #262626; cursor: pointer; white-space: nowrap; }
  .wots-btn-active { background-color: #ffffff; color: #000000; border-color: #ffffff; }
  .wots-btn-inactive { background-color: #171717; color: #a3a3a3; }
  .wots-btn-inactive:hover { border-color: #404040; }
  .wots-card { padding: 1.25rem; border-radius: 0.75rem; border: 1px solid #262626; background-color: rgba(23, 23, 23, 0.4); margin-bottom: 1rem; position: relative; }
  .wots-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 11px; font-weight: 700; color: #737373; margin-bottom: 0.75rem; }
  .wots-badge { padding: 0.125rem 0.5rem; border-radius: 4px; background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); text-transform: uppercase; font-size: 10px; }
  .wots-card-title { font-size: 1.25rem; font-weight: 800; color: #ffffff; line-height: 1.4; margin: 0 0 1rem 0; }
  .wots-img-box { overflow: hidden; border-radius: 0.5rem; background-color: #171717; width: 100%; aspect-ratio: 16/9; margin-bottom: 1rem; }
  .wots-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }
  .wots-footer-line { padding-top: 0.75rem; border-top: 1px solid #262626; display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: #737373; }
  .wots-link { color: #f59e0b; font-weight: 700; text-decoration: none; }
  .wots-link:hover { text-decoration: underline; }
  .wots-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 0; color: #a3a3a3; gap: 0.5rem; font-size: 0.875rem; }
`;

const categories = ['All', 'Concerts', 'Sporting Events', 'Movies', 'Places to Dine', 'Other'];

// Safe timestamp parser
const parseFeedDate = (dateStr) => {
  if (!dateStr || dateStr.includes('Now') || dateStr.includes('ago')) return new Date();
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const months = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
    return new Date(2026, months[parts[1]] || 0, day);
  }
  return new Date();
};

// In-app generator arrays
const concertArtists = ['Fred again..', 'Luude', 'The Neighbourhood', 'Foo Fighters', 'Six60', 'Lorde', 'Benee'];
const sportsClashes = ['Auckland FC vs Sydney FC', 'All Blacks vs Wallabies', 'Crusaders vs Blues', 'Black Caps vs England'];
const venues = ['Spark Arena', 'Eden Park', 'Sky Stadium', 'Wolfbrook Arena', 'Hagley Oval'];
const restaurantNames = ['Inati', 'Origine', 'Loretta', 'King of Snake', 'Amisfield'];

const generateLocalFeeds = () => {
  const generated = [];
  
  for (let i = 0; i < 3; i++) {
    const artist = concertArtists[Math.floor(Math.random() * concertArtists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-c-${i}-${Math.random()}`,
      category: 'Concerts',
      subCategory: 'Hot Concert Coming Soon',
      time: `${randomDay} Aug 2026`,
      title: `${artist} Live at ${venue}`,
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
      source: 'Ticketmaster NZ',
      sourceUrl: 'https://www.ticketmaster.co.nz'
    });
  }

  for (let i = 0; i < 3; i++) {
    const clash = sportsClashes[Math.floor(Math.random() * sportsClashes.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    generated.push({
      id: `sim-s-${i}-${Math.random()}`,
      category: 'Sporting Events',
      subCategory: 'Sporting Event Coming Soon',
      time: `${randomDay} Sep 2026`,
      title: `${clash} Live at ${venue}`,
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
      source: 'Sky Sport NZ',
      sourceUrl: 'https://www.skysport.co.nz'
    });
  }

  for (let i = 0; i < 2; i++) {
    const rest = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
    generated.push({
      id: `sim-d-${i}-${Math.random()}`,
      category: 'Places to Dine',
      subCategory: 'Trending Spot Open Now',
      time: 'Trending Now',
      title: `${rest} Dining Showcase`,
      imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80',
      source: 'Cuisine Magazine',
      sourceUrl: 'https://www.google.com'
    });
  }

  return generated;
};

export function App() {
  const [feedItems, setFeedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const triggerFreshDataLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFeedItems(generateLocalFeeds());
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    triggerFreshDataLoad();
  }, []);

  const filteredItems = feedItems
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => parseFeedDate(a.time) - parseFeedDate(b.time));

  return (
    <div className="wots-bg">
      <style>{embeddedStyles}</style>

      <header className="wots-header">
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="wots-title">
            WOTS-<span className="wots-orange">HOT</span>
          </h1>
          <button onClick={triggerFreshDataLoad} className="wots-btn-refresh">
            🔄 Simulate Live Scrape
          </button>
        </div>
      </header>

      <main className="wots-container">
        <div className="wots-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`wots-filter-btn ${selectedCategory === cat ? 'wots-btn-active' : 'wots-btn-inactive'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="wots-loading">
            <span>🔄</span>
            <p>Refreshing notice streams...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredItems.map((item) => (
              <article key={item.id} className="wots-card">
                <div className="wots-meta">
                  <span className="wots-badge">{item.category}</span>
                  <span>•</span>
                  <span style={{ color: '#e5e5e5' }}>{item.subCategory}</span>
                  <span>•</span>
                  <span style={{ color: '#f97316' }}>{item.time}</span>
                </div>

                <h2 className="wots-card-title">{item.title}</h2>

                {item.imageUrl && (
                  <div className="wots-img-box">
                    <img src={item.imageUrl} alt={item.title} className="wots-img" />
                  </div>
                )}

                <div className="wots-footer-line">
                  <span>Source: <span style={{ color: '#e5e5e5', fontWeight: 600 }}>{item.source}</span></span>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="wots-link">
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

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
