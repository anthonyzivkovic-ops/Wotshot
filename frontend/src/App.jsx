import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Clean Base Data Model with static date strings and deep regional coverage
const initialEvents = [
  // EVENTS: CONCERTS & FESTIVALS
  {
    id: 'e1',
    category: 'Events',
    subCategory: 'Concerts & Stadium Gigs',
    time: '04 Aug 2026', 
    title: 'The Neighbourhood: Live at Spark Arena',
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
    subCategory: 'Live Music Festivals',
    time: '11 Aug 2026',
    title: 'Luude: Australasian Winter Tour Direct Hits',
    points: [
      'Location: Wellington (Shed 6) & Auckland (Shed 10 dates).',
      'The chart-topping electronic producer brings high-energy festival-tier sets directly to major regional venues.',
      'Strictly limited door sales available alongside general admission passes.'
    ],
    source: 'Live Nation NZ',
    sourceUrl: 'https://www.livenation.co.nz'
  },
  {
    id: 'e3',
    category: 'Events',
    subCategory: 'Cinema Blockbusters',
    time: '09 Aug 2026', 
    title: 'Disney Premieres – Nationwide Commercial Cinematic Releases',
    points: [
      'Location: Hoyts & Event Cinemas (Auckland, Wellington, Christchurch).',
      'The highly anticipated silver-screen seasonal headliner lands across all major commercial theater circuits.',
      'Advance family and premium lounge ticket booking tiers open this week.'
    ],
    source: 'Event Cinemas',
    sourceUrl: 'https://www.eventcinemas.co.nz'
  },
  {
    id: 'e4',
    category: 'Events',
    subCategory: 'Concerts & Stadium Gigs',
    time: '15 Sep 2026',
    title: 'Rüfüs Du Sol: Summer Horizon Tour Opener',
    points: [
      'Location: Christchurch | Hagley Park Entertainment Arena.',
      'Grammy-winning electronic trio locks in a massive open-air South Island stadium production.',
      'Presale ticket allocations launch via regional promoter channels this Tuesday morning.'
    ],
    source: 'Ticketek New Zealand',
    sourceUrl: 'https://www.ticketek.co.nz'
  },
  {
    id: 'e5',
    category: 'Events',
    subCategory: 'Live Theatre & Musicals',
    time: '22 Oct 2026',
    title: 'Wicked The Musical: Star-Studded Civic Run',
    points: [
      'Location: Auckland | The Civic Theatre.',
      'The legendary Broadway production lands in Auckland for a strictly limited four-week regional season.',
      'Corporate hospitality suites and weekend matinee allocations opening to the public early.'
    ],
    source: 'Auckland Live',
    sourceUrl: 'https://www.aucklandlive.co.nz'
  },
  // EVENTS: MAJOR SPORTS SHOWCASES
  {
    id: 'e6',
    category: 'Events',
    subCategory: 'International Football',
    time: '26 Aug 2026',
    title: 'Tottenham Hotspur vs Auckland FC Blockbuster Clash',
    points: [
      'Location: Auckland | Eden Park.',
      'English Premier League giants travel to local shores to take on Auckland FC in a massive stadium spectacle.',
      'Part of the International Football Festival; expect an absolute packed house.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  },
  {
    id: 'e7',
    category: 'Events',
    subCategory: 'Major Sports Showcase',
    time: '08 Sep 2026', 
    title: 'Chelsea FC Women vs Auckland FC Women Historic Match',
    points: [
      'Location: Auckland | Eden Park.',
      'Women’s Super League champions Chelsea FC face New Zealand’s newest squad in an elite international showcase.',
      'Doubleheader configurations and hospitality packages open to mass-market public booking pipelines.'
    ],
    source: 'Eden Park Events',
    sourceUrl: 'https://edenpark.co.nz'
  },
  {
    id: 'e8',
    category: 'Events',
    subCategory: 'International Cricket',
    time: '14 Nov 2026',
    title: 'Black Caps vs Australia: T20 Summer Series Launch',
    points: [
      'Location: Wellington | Sky Stadium.',
      'The ultimate Trans-Tasman rivalry lights up the capital in the opening fixture of the white-ball schedule.',
      'Grandstand and premium embankment tickets tracking near capacity within hours of release.'
    ],
    source: 'Sky Stadium',
    sourceUrl: 'https://www.skystadium.co.nz'
  },
  {
    id: 'e9',
    category: 'Events',
    subCategory: 'Motorsport Spectacles',
    time: '05 Dec 2026',
    title: 'ITM New Zealand Supercars Sprint Championship',
    points: [
      'Location: Taupō International Motorsport Park.',
      'The high-octane V8 Supercars circuit returns to the central North Island for an intense weekend of street racing.',
      'Trackside camping tokens and grandstand corporate privileges selling quickly via official networks.'
    ],
    source: 'Supercars Official',
    sourceUrl: 'https://www.supercars.com'
  }
];

const initialPackets = [
  // SPORTS - NETBALL
  {
    id: 's1',
    category: 'Sports',
    subCategory: 'Netball',
    time: '4m ago',
    title: 'Silver Ferns Lock In High-Octane International Quad Series Schedule',
    points: [
      'Netball New Zealand confirms major home tests across Christchurch Arena and Wellington’s TSB Arena.',
      'Head coach introduces two uncapped midcourters following standout domestic performance matrices.',
      'High-performance training camps slate structural defensive drills to counter fast-paced English structures.'
    ],
    source: 'Radio New Zealand',
    sourceUrl: 'https://www.rnz.co.nz'
  },
  {
    id: 's2',
    category: 'Sports',
    subCategory: 'Netball',
    time: '1h ago',
    title: 'ANZ Premiership: Northern Mystics Edge Out Pulse In Final Seconds',
    points: [
      'A thrilling one-point victory at the Trusts Arena keeps the Auckland squad sitting atop the domestic table.',
      'Defensive intercepts in the final phase prove decisive as crowd attendance breaks stadium seasonal metrics.',
      'Injury update confirms starting shooter clears scans following a minor third-quarter ankle twist.'
    ],
    source: 'Stuff.co.nz',
    sourceUrl: 'https://www.stuff.co.nz'
  },

  // SPORTS - BASKETBALL
  {
    id: 's3',
    category: 'Sports',
    subCategory: 'Basketball',
    time: '14m ago',
    title: 'NZ Breakers Secure Top-Tier Elite Import Forward For NBL Campaign',
    points: [
      'Former NBA G-League offensive specialist signs a guaranteed one-year contract targeting the upcoming season.',
      'Management cites aggressive frontcourt capabilities as the core piece for their modern transition game.',
      'Pre-season training fixtures scheduled to launch across regional community stadiums next month.'
    ],
    source: 'NZ Herald',
    sourceUrl: 'https://www.nzherald.co.nz'
  },
  {
    id: 's4',
    category: 'Sports',
    subCategory: 'Basketball',
    time: '2h ago',
    title: 'Tall Blacks Finalise Core Roster Ahead of Crucial FIBA Asia Cup Qualifiers',
    points: [
      'Selection panel leverages European-based professional assets to build robust interior combinations.',
      'The squad assembles in Wellington for an intensive five-day tactical training block under local banners.',
      'Broadcast rights secured for live domestic primetime delivery across mainstream networks.'
    ],
    source: 'Sky Sport NZ',
    sourceUrl: 'https://www.skysport.co.nz'
  },

  // SPORTS - TENNIS
  {
    id: 's5',
    category: 'Sports',
    subCategory: 'Tennis',
    time: '32m ago',
    title: 'ASB Classic Announces Major Top 10 Grand Slam Draw For Auckland Venue',
    points: [
      'Tournament directors confirm two current top-tier international stars lock in their summer warm-up profiles.',
      'Infrastructure teams initiate premium court resurfacing protocols at the iconic Stanley Street tennis center.',
      'Corporate marquee allocations hit maximum capacity target allocations ahead of structural timelines.'
    ],
    source: 'ASB Classic Online',
    sourceUrl: 'https://www.asbclassic.co.nz'
  },
  {
    id: 's6',
    category: 'Sports',
    subCategory: 'Tennis',
    time: '3h ago',
    title: 'Kiwi Doubles Specialist Advances to Quarterfinals At Wimbledon Circuit',
    points: [
      'An intense straight-sets triumph over the third-seeded pairing secures a historic deep tournament run.',
      'On-court tactical adjustments and strong baseline service holds neutralise opponent break opportunities.',
      'Updated global ranking formulas project a move into the top fifteen individual world brackets.'
    ],
    source: 'Stuff.co.nz',
    sourceUrl: 'https://www.stuff.co.nz'
  },

  // SPORTS - RUGBY UNION
  {
    id: 's7',
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
    sourceUrl: 'https://www.stuff.co.nz'
  },
  {
    id: 's8',
    category: 'Sports',
    subCategory: 'Rugby Union',
    time: '4h ago',
    title: 'Super Rugby Pacific: Crusaders Unveil High-Performance Rookie Combinations',
    points: [
      'The tactical depth chart brings elite academy graduates into the starting lineup for the southern derby.',
      'Medical units confirm starting lock returns ahead of schedule following rehabilitation programs.',
      'Local transit authorities arrange dedicated stadium shuttle networks for ticket holders.'
    ],
    source: 'Super Rugby NZ',
    sourceUrl: 'https://www.superrugby.co.nz'
  },

  // SPORTS - CRICKET
  {
    id: 's9',
    category: 'Sports',
    subCategory: 'Cricket',
    time: '45m ago',
    title: 'White Ferns Secure Domination Over South Africa In International Opener',
    points: [
      'An explosive unbeaten half-century guides the local team past the targeted chasing run rate with overs to spare.',
      'Spin options prove highly efficient on a slow turning track at Hamilton’s Seddon Park.',
      'Team doctors review bowling workloads before shifting configurations to the next regional ground.'
    ],
    source: 'NZ Herald',
    sourceUrl: 'https://www.nzherald.co.nz'
  },

  // ENTERTAINMENT - STREAMING & MEDIA
  {
    id: 'en1',
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
    sourceUrl: 'https://www.nzherald.co.nz'
  },
  {
    id: 'en2',
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
    sourceUrl: 'https://www.undertheradar.co.nz'
  },
  {
    id: 'en3',
    category: 'Entertainment',
    subCategory: 'Television Networks',
    time: '2h ago',
    title: 'Local TV Network Unveils Multi-Million Dollar Prime Drama Slate',
    points: [
      'Funding approvals back three premium local mystery series filmed extensively across Otago landscapes.',
      'Industry veterans join production crews to enhance visual cinematic frameworks for export markets.',
      'Interactive mobile applications launch concurrently to drive weekly consumer engagement models.'
    ],
    source: 'The Spinoff',
    sourceUrl: 'https://thespinoff.co.nz'
  },
  {
    id: 'en4',
    category: 'Entertainment',
    subCategory: 'Pop Culture & Radio',
    time: '5h ago',
    title: 'National Radio Network Announces Structural Breakfast Show Hosting Shifts',
    points: [
      'Award-winning media personalities transition to drive-time programming slots in seasonal market re-alignment.',
      'Studio executives confirm updated digital-first broadcasting modules tracking real-time listener feedback.',
      'Live nationwide broadcast segments will feature intimate acoustic studio showcases starting next week.'
    ],
    source: 'Stuff.co.nz',
    sourceUrl: 'https://www.stuff.co.nz'
  },

  // BUSINESS
  {
    id: 'b1',
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
    sourceUrl: 'https://www.interest.co.nz'
  },
  {
    id: 'b2',
    category: 'Business',
    subCategory: 'Real Estate Infrastructure',
    time: '3h ago',
    title: 'Auckland Commercial Property Development Lands Mega Tech Tenancy Anchor',
    points: [
      'A multi-year lease agreement seals structural occupancy across six premium green-certified office tiers.',
      'Architectural modifications focus on deploying smart-grid automated power regulation technologies.',
      'Local construction contractors ramp up workforce allocations to meet inner-city deadline demands.'
    ],
    source: 'NBR',
    sourceUrl: 'https://www.nbr.co.nz'
  },

  // WORLD & REGIONAL NEWS
  {
    id: 'w1',
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
    sourceUrl: 'https://www.rnz.co.nz'
  },
  {
    id: 'w2',
    category: 'World',
    subCategory: 'Climate Partnerships',
    time: '6h ago',
    title: 'Pacific Nations Formulate Shared Blue-Economy Maritime Frameworks',
    points: [
      'Delegates outline strict operational parameters for sustainable deep-water conservation zones.',
      'Scientific research networks launch collaborative data mapping streams tracking southern ocean temperatures.',
      'Joint infrastructure capital allocations target alternative energy generation hubs across rural islands.'
    ],
    source: 'Radio New Zealand',
    sourceUrl: 'https://www.rnz.co.nz'
  },

  // TECHNOLOGY
  {
    id: 't1',
    category: 'Technology',
    subCategory: 'Digital Infrastructure',
    time: '3h ago',
    title: 'Hyper-Scale Cloud Data Center Officially Powers Up Infrastructure Hub',
    points: [
      'The multi-million dollar local facility goes live to support enterprise-grade digital services.',
      'Architecture features localized backup arrays to maximize up-time against regional interruptions.',
      'Tech sectors forecast expanded operational capacities for local software development pipelines.'
    ],
    source: 'NBR',
    sourceUrl: 'https://www.nbr.co.nz'
  },

  // POLITICS
  {
    id: 'p3',
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
    sourceUrl: 'https://thespinoff.co.nz'
  }
];

const categories = ['All', 'Events', 'Entertainment', 'Sports', 'Business', 'World', 'Technology', 'Politics'];

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
      const query = encodeURIComponent(`${item.title} New Zealand`);
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
            {/* Full-Color New Zealand Flag */}
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

                <h2 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h2>

                <ul className="space-y-2.5 text-sm text-neutral-300 list-disc pl-4 marker:text-neutral-600">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{point}</li>
                  ))}
                </ul>

                {/* Bottom Bar Controls Container */}
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
