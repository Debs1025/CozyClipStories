import React, { useState } from 'react';
import logo from './assets/CozyClips.png';
import dashboardIcon from './assets/Sidebar/dashboardIcon.png';
import quizIcon from './assets/Sidebar/QuizIcon.png';
import bookmarkIcon from './assets/Sidebar/bookmarkIcon.png';
import wordHelpIcon from './assets/Sidebar/wordhelpIcon.png';
import logoutIcon from './assets/Sidebar/logoutIcon.png';
import diamondIcon from './assets/diamodIcon.png';
import moneyIcon from './assets/moneyIcon.png';
import searchIcon from './assets/searchIcon.png';
import vectorIcon from './assets/Vector.png';

const booksToday = new Array(9).fill(0).map((_, i) => ({
  id: `t-${i}`,
  title: 'Forever Endeavor',
  subtitle: "This book was about a bird who didn't yet know how to fly",
  cover: `https://picsum.photos/seed/t${i}/640/360`,
}));

const booksYesterday = new Array(4).fill(0).map((_, i) => ({
  id: `y-${i}`,
  title: 'Forever Endeavor',
  subtitle: "This book was about a bird who didn't yet know how to fly",
  cover: `https://picsum.photos/seed/y${i}/640/360`,
}));

function IconBookmark(props) {
  return (
    <img 
      src={bookmarkIcon} 
      alt="Bookmark" 
      className={props.className}
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
      }}
    />
  );
}

function BookmarkFallback(props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className={props.className}
      style={{display: 'none'}}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

function BookCard({ book }) {
  return (
    <div className="card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img src={book.cover} alt="cover" className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-brand-ink">{book.title}</h3>
        <p className="mt-1 text-sm text-brand-muted leading-snug line-clamp-2">{book.subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2" style={{border: 'none', outline: 'none', background: 'transparent'}} aria-label="Bookmark">
              <svg viewBox="0 0 24 24" fill="#166534" className="h-5 w-5 opacity-80 hover:opacity-100" style={{border: 'none', outline: 'none'}}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="btn bg-brand-card hover:bg-brand-beige">
              <IconPlay className="h-4 w-4 text-brand-button" />
              <span>Read Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeNavItem, setActiveNavItem] = useState('Bookmarks');
  const [currentPage, setCurrentPage] = useState('bookmarks');

  const handleNavClick = (itemLabel) => {
    setActiveNavItem(itemLabel);
    // You can expand this later to handle different pages
    console.log(`Navigating to: ${itemLabel}`);
    
    // Example: Set different pages based on the clicked item
    switch(itemLabel) {
      case 'Dashboard':
        setCurrentPage('dashboard');
        break;
      case 'Quiz Game':
        setCurrentPage('quiz');
        break;
      case 'Bookmarks':
        setCurrentPage('bookmarks');
        break;
      case 'Word Helper':
        setCurrentPage('wordhelper');
        break;
      default:
        setCurrentPage('bookmarks');
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here later
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-brand-border bg-[#870022] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="CozyClips Logo" className="h-12 w-auto" />
          </div>
          <nav className="hidden gap-6 md:flex items-center justify-center flex-1">
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Library</a>
            <a className="nav-link" href="#">Challenges</a>
            <a className="nav-link" href="#">Shop</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={diamondIcon} alt="Diamond" className="h-6 w-6" />
              <span className="text-sm font-semibold">0</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={moneyIcon} alt="Money" className="h-6 w-6" />
              <span className="text-sm font-semibold">0</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/20" />
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-48 h-full bg-white p-3 flex flex-col border-r border-brand-border">
          <nav className="space-y-2 flex-1">
            {[
              { label: 'Dashboard', icon: dashboardIcon },
              { label: 'Quiz Game', icon: quizIcon },
              { label: 'Bookmarks', icon: bookmarkIcon },
              { label: 'Word Helper', icon: wordHelpIcon },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-left no-underline transition-colors border-none focus:outline-none ${
                  activeNavItem === item.label 
                    ? 'bg-[#870022] text-white font-semibold' 
                    : 'hover:bg-brand-card text-black bg-transparent'
                }`}
              >
                <img src={item.icon} alt={item.label} className="h-4 w-4 border-none outline-none" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center justify-start gap-2 rounded px-2 py-2 text-xs hover:bg-brand-card focus:outline-none focus:ring-2 focus:ring-red-500 active:bg-red-50 active:border-red-500 border-2 border-transparent"
            >
              <img src={logoutIcon} alt="Log Out" className="h-4 w-4" />
              <span className="truncate">Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header section - fixed */}
          <div className="p-6 pb-0">
            <div className="rounded-md border border-brand-border bg-brand-beige/60 p-5">
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl">Your Bookmarks</h2>
                <div className="flex flex-1 justify-center">
                  <div className="flex w-full max-w-md items-center overflow-hidden rounded-md border border-brand-border bg-white">
                    <input className="w-full px-3 py-2 text-sm outline-none" placeholder="Search bookmarks..." />
                    <button className="px-3 py-2 bg-[#870022] hover:bg-[#70001b] text-white">
                      <img src={searchIcon} alt="Search" className="h-4 w-4" />
                    </button>
                  </div>
                  </div>
                <div className="flex items-center gap-2">
                  <button className="btn">All Bookmarks</button>
                  <button className="btn" aria-label="Go"><span className="text-sm">▶</span></button>
                </div>
              </div>

              <div className="mt-5 divider" />
            </div>
          </div>

          {/* Books section - scrollable */}
          <div className="flex-1 overflow-y-auto p-6 pt-0">
            <div className="rounded-md border border-brand-border bg-brand-beige/60 p-5">
              {/* Today section */}
              <section className="mt-6">
                <h3 className="font-display text-xl">Today</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {booksToday.map((b) => (
                    <BookCard key={b.id} book={b} />
                  ))}
                </div>
              </section>

              {/* Yesterday section */}
              <div className="my-6 divider" />
              <section className="mt-6">
                <h3 className="font-display text-xl">Yesterday</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {booksYesterday.map((b) => (
                    <BookCard key={b.id} book={b} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
