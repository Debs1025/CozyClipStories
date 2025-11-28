import React from 'react';
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import logo from './assets/CozyClips.png';
import dashboardIcon from './assets/Sidebar/dashboardIcon.png';
import quizIcon from './assets/Sidebar/QuizIcon.png';
import bookmarkIcon from './assets/Sidebar/bookmarkIcon.png';
import wordHelpIcon from './assets/Sidebar/wordhelpIcon.png';
import logoutIcon from './assets/Sidebar/logoutIcon.png';
import moneyIcon from './assets/moneyIcon.png';
import Bookmark from './pages/Bookmark.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Quiz from './pages/Quiz.jsx';
import WordHelper from './pages/WordHelper.jsx';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: dashboardIcon, to: '/dashboard' },
  { label: 'Quiz Game', icon: quizIcon, to: '/quiz' },
  { label: 'Bookmarks', icon: bookmarkIcon, to: '/bookmarks' },
  { label: 'Word Helper', icon: wordHelpIcon, to: '/wordhelper' },
];

 

export default function App() {
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here later
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-ink overflow-x-hidden">
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
      <div className="flex flex-col md:flex-row h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className="w-full md:w-48 bg-white p-3 flex flex-col border-brand-border border-b md:border-b-0 md:border-r flex-shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto">
          <nav className="space-y-2 flex-1 pr-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex w-full items-center gap-2 rounded-l-md px-2 py-2 text-xs text-left no-underline transition-colors border-none focus:outline-none mr-2 ${
                    isActive ? 'bg-[#870022] text-white font-semibold' : 'hover:bg-brand-card text-black bg-transparent'
                  }`
                }
              >
                <img src={item.icon} alt={item.label} className="h-4 w-4 border-none outline-none" />
                <span className="truncate">{item.label}</span>
              </NavLink>
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
        <main className="flex-1 flex flex-col overflow-y-auto h-[calc(100vh-56px)]">
          <Routes>
            <Route path="/" element={<Navigate to="/bookmarks" replace />} />
            <Route path="/bookmarks" element={<Bookmark />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/wordhelper" element={<WordHelper />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/bookmarks" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
