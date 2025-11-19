import React, { useState } from 'react';
import logo from './assets/CozyClips.png';
import dashboardIcon from './assets/Sidebar/dashboardIcon.png';
import quizIcon from './assets/Sidebar/QuizIcon.png';
import bookmarkIcon from './assets/Sidebar/bookmarkIcon.png';
import wordHelpIcon from './assets/Sidebar/wordhelpIcon.png';
import logoutIcon from './assets/Sidebar/logoutIcon.png';
import moneyIcon from './assets/moneyIcon.png';
import Bookmark from './pages/Bookmark.jsx';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: dashboardIcon, page: 'dashboard' },
  { label: 'Quiz Game', icon: quizIcon, page: 'quiz' },
  { label: 'Bookmarks', icon: bookmarkIcon, page: 'bookmarks' },
  { label: 'Word Helper', icon: wordHelpIcon, page: 'wordhelper' },
];

 

export default function App() {
  const [activeNavItem, setActiveNavItem] = useState('Bookmarks');
  const [currentPage, setCurrentPage] = useState('bookmarks');

  const handleNavClick = (itemLabel) => {
    setActiveNavItem(itemLabel);
    const matched = NAV_ITEMS.find((i) => i.label === itemLabel);
    setCurrentPage(matched ? matched.page : 'bookmarks');
  };

  const handleLogout = () => {
    // Add logout logic here later
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-brand-border bg-[#870022] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
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
              <img src={moneyIcon} alt="Money" className="h-6 w-6" />
              <span className="text-sm font-semibold">0</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/20" />
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="w-48 h-full bg-white p-3 flex flex-col border-r border-brand-border">
          <nav className="space-y-2 flex-1">
            {NAV_ITEMS.map((item) => (
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
          {currentPage === 'bookmarks' && <Bookmark />}
        </main>
      </div>
    </div>
  );
}
