import React from 'react';
import Navbar from "../components/Navbar";

const ProfileScreen = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- TOP NAVIGATION BAR --- */}
      <Navbar /> 
      
      {/* --- PROFILE BANNER SECTION --- */}
      {/* FIX: Added pt-16 (padding-top: 4rem or 64px) to push the banner 
        down below the fixed Navbar component. 
      */}
      <div className="w-full h-44 bg-cover bg-center pt-16" style={{ backgroundImage: 'url(/profilebg.png)' }}> 
        <div className="max-w-7xl mx-auto h-full flex items-center px-8 relative">

          {/* LEFT – PROFILE CARD */}
          <div className="flex items-center gap-4 h-full">
            {/* White Square Placeholder (Adjusted size to match image) */}
            <div className="w-20 h-20 bg-white rounded-md shadow-md flex-none-0"></div>
            
            <div className="flex items-start gap-3 mt-4">
              
              {/* Profile Icon (profile.png) and Details */}
              <div className="flex flex-col items-center">
                {/* Profile Icon Placeholder (The globe/helmet icon) */}
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center -mt-2">
                    <img src="/profile.png" alt="Profile Icon" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>

              <div className="flex flex-col text-white pt-2">
                <h2 className="text-xl font-semibold leading-none">Kapitan Moh</h2>
                <p className="text-sm leading-none">kapmoh@gmail.com</p>
                <p className="text-sm mt-1 font-medium leading-none">Bronze I</p>

                {/* XP BAR */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#E57373] flex items-center justify-center">
                        <span className="text-xs font-bold text-white"></span> {/* Placeholder for icon */}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">17 / 50</span>
                        <span className="uppercase tracking-wider font-light">Lvl</span>
                    </div>
                    <div className="w-44 h-2 bg-white/50 rounded-full ml-2">
                        {/* 17/50 is 34% */}
                        <div className="h-2 bg-[#F53F3F] rounded-full" style={{ width: "34%" }} />
                    </div>
                </div>

                {/* COMPLETED BAR */}
                <div className="mt-1 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#7AC7E0] flex items-center justify-center">
                        <span className="text-xs font-bold text-white"></span> {/* Placeholder for icon */}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">4 / 10</span>
                        <span className="uppercase tracking-wider font-light">Completed</span>
                    </div>
                    <div className="w-44 h-2 bg-white/50 rounded-full ml-2">
                        {/* 4/10 is 40% */}
                        <div className="h-2 bg-[#7AC7E0] rounded-full" style={{ width: "40%" }} />
                    </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT CTA BOX + DRAGON */}
          <div className="absolute right-0 top-0 h-full flex items-center justify-end pointer-events-none">
            
            {/* DRAGON IMAGE (dragon.png) */}
            <img
                src="/dragon.png"
                className="h-44 object-contain pointer-events-none select-none absolute right-0 top-0"
                alt="Dragon"
            />
            
            {/* CTA BOX (desc.png as background, positioned relative to the dragon) */}
            <div 
                className="text-white px-6 py-4 rounded-xl shadow-lg w-96 z-10 mr-16 mt-4" // Adjusted width and margin to position it next to the dragon
                style={{
                    backgroundImage: 'url(/descbg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100px', // Ensure it covers the required area
                    pointerEvents: 'auto'
                }}
            >
                <h3 className="font-semibold text-xl leading-snug">Unlock Stories, Level Up Learning.</h3>
                <p className="text-sm mt-1 leading-snug">
                    Story driven games make reading fun and rewarding through interactive, anytime learning.
                </p>
            </div>

          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto py-10 px-8 flex gap-8">
        
        {/* LEFT – BRONZE RANK AND ACHIEVEMENTS */}
        <div className="w-2/3 flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 w-full flex flex-col items-center">
                {/* Bronze Rank Image (bronze-rank.png) */}
                <img
                    src="/bronze-rank.png"
                    className="w-56 h-auto object-contain mb-4"
                    alt="Bronze Rank Badge"
                />
                <h3 className="text-xl font-medium">Bronze I</h3>
            </div>
        </div>
        
        {/* RIGHT – ACHIEVEMENTS LIST */}
        <div className="w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 h-full">
            <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
              <span role="img" aria-label="trophy">🏆</span>
              Achievements
            </h3>
            {/* Achievement list content would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;