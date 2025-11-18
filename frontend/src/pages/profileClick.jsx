import React from 'react';
import Navbar from "./components/Navbar";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Target, CheckCircle } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- TOP NAVIGATION BAR --- */}
      <Navbar /> 
      
      {/* --- PROFILE BANNER SECTION --- */}
      <div 
        className="w-full h-44 bg-cover bg-center pt-16" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1640963269654-3fe248c5fba6?w=1600&h=400&fit=crop)',
          backgroundColor: '#4A7C8F'
        }}
      > 
        <div className="max-w-7xl mx-auto h-full flex items-center px-8 relative" style={{ backgroundImage: 'url(/profilebg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

          {/* LEFT – PROFILE CARD */}
          <div className="flex items-center gap-4 h-full">
            {/* White Square Placeholder */}
            <div className="w-20 h-20 bg-white rounded-md shadow-md flex-none"></div>
            
            <div className="flex items-start gap-3 mt-4">
              
              {/* Profile Icon */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center -mt-2">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1640963269654-3fe248c5fba6?w=32&h=32&fit=crop" 
                    alt="Profile Icon" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
              </div>

              <div className="flex flex-col text-white pt-2">
                <h2 className="text-xl">Kapitan Moh</h2>
                <p className="text-sm">kapmoh@gmail.com</p>
                <p className="text-sm mt-1">Bronze I</p>

                {/* XP BAR */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#E57373] flex items-center justify-center">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>17 / 50</span>
                        <span className="uppercase tracking-wider">Lvl</span>
                    </div>
                    <div className="w-44 h-2 bg-white/50 rounded-full ml-2">
                        {/* 17/50 is 34% */}
                        <div className="h-2 bg-[#F53F3F] rounded-full" style={{ width: "34%" }} />
                    </div>
                </div>

                {/* COMPLETED BAR */}
                <div className="mt-1 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#7AC7E0] flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>4 / 10</span>
                        <span className="uppercase tracking-wider">Completed</span>
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
            
            {/* DRAGON IMAGE */}
            <ImageWithFallback
                src="https://images.unsplash.com/photo-1581023701827-b50cbca3cb18?w=400&h=400&fit=crop"
                className="h-44 object-contain pointer-events-none select-none absolute right-0 top-0"
                alt="Dragon"
            />
            
            {/* CTA BOX */}
            <div 
                className="text-white px-6 py-4 rounded-xl shadow-lg w-96 z-10 mr-16 mt-4"
                style={{
                    backgroundImage: 'url(/descbg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#6B4423',
                    minHeight: '100px',
                    pointerEvents: 'auto'
                }}
            >
                <h3 className="text-xl">Unlock Stories, Level Up Learning.</h3>
                <p className="text-sm mt-1">
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
                {/* Bronze Rank Image */}
                <ImageWithFallback
                    src="/bronze-rank.png"
                    className="w-56 h-auto object-contain mb-4"
                    alt="Bronze Rank Badge"
                />
                <h3 className="text-xl">Bronze I</h3>
            </div>
        </div>
        
        {/* RIGHT – ACHIEVEMENTS LIST */}
        <div className="w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 h-full">
            <h3 className="text-lg text-red-700 flex items-center gap-2">
              <span role="img" aria-label="trophy">🏆</span>
              Achievements
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-sm">First Steps</p>
                  <p className="text-xs text-gray-500">Complete your first story</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="text-sm">Bookworm</p>
                  <p className="text-xs text-gray-500">Read 10 stories</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-sm">Rising Star</p>
                  <p className="text-xs text-gray-500">Reach Bronze I rank</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg opacity-50">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm">On Fire!</p>
                  <p className="text-xs text-gray-500">7-day reading streak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;