import React from 'react';
import { Globe, Coins } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#5c0a16] h-16 shadow-md z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        
        {/* LEFT – LOGO */}
        <div className="flex items-center gap-2">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1577550932197-968a1eb44a63?w=100&h=100&fit=crop"
            alt="Cozy Clips Logo"
            className="h-10 w-auto"
          />
          <img src="/cclogo.png" alt="Cozy Reader" className="h-8 w-auto" />
        </div>

        {/* CENTER – NAVIGATION LINKS */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-white hover:text-gray-200 transition-colors">Home</a>
          <a href="/library" className="text-white hover:text-gray-200 transition-colors">Library</a>
          <a href="/challenges" className="text-white hover:text-gray-200 transition-colors">Challenges</a>
          <a href="/shop" className="text-white hover:text-gray-200 transition-colors">Shop</a>
        </div>

        {/* RIGHT – ICONS AND PROFILE */}
        <div className="flex items-center gap-6">
          {/* Globe Icon with Badge */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <img src="/life.png" alt="Life" className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 bg-white text-[#8B2635] text-xs px-1.5 py-0.5 rounded-full">0</span>
          </div>

          {/* Coins Icon with Badge */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <img src="/coins.png" alt="Coins" className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 bg-white text-[#8B2635] text-xs px-1.5 py-0.5 rounded-full">0</span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex flex-col items-end gap-0.5 text-white hover:text-gray-200 transition-colors">
              <span className="text-sm">Profile</span>
              <span className="text-sm">Edit Profile</span>
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;