import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ccLogo from "./assets/cclogo.png";
import profileImg from "./assets/profile.png";
import coinsImg from "./assets/coins.png";
import { NavigationBar } from './components/NavigationBar';
import LearningProgress from './pages/Learningprogress';
import ProfileSettings from './pages/ProfileSettings';
import Achievements from './pages/Achievements';

export default function App() {
  return (
    <AppLayout>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Navigate to="/learning-progress" replace />} />
        <Route path="/learning-progress" element={<LearningProgress />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </AppLayout>
  );
}

function AppLayout({ children }) {
  const [studentCoins] = useState(250);
  const [studentGems] = useState(15);

  return (
    <div className="bg-[#f3ebe2] relative min-h-screen">
      
      {/* HEADER */}
      <div className="absolute bg-[#870022] h-[74px] left-0 top-0 w-full" />
      
      {/* LOGO */}
      <div className="absolute h-[65px] left-9 top-0 w-[193px] flex items-center">
        <img 
          src={ccLogo} 
          alt="CozyClips Logo" 
          className="h-full object-contain"
        />
      </div>

      {/* COINS (gems removed; coins now show image) */}
      <div className="absolute flex items-center gap-3 right-[140px] top-[22px]">
        <div className="flex items-center gap-2">
          <img src={coinsImg} alt="Coins" className="h-[22px] w-[22px] object-contain" />
          <p className="font-kameron-bold text-[#cfcfcf] text-[19px]">{studentCoins}</p>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <div className="absolute flex gap-12 left-[520px] top-[25px] text-[18px] font-kameron-regular text-[#f3ebe2]">
        <p>Home</p>
        <p>Library</p>
        <p>Challenges</p>
        <p>Shop</p>
      </div>

      {/* PROFILE AVATAR */}
      <div className="absolute right-10 top-3.5 h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
        <img 
          src={profileImg}
          alt="Profile avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-[100px] pb-12 px-8">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
