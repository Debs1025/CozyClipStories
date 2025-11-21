import { Link, useLocation } from 'react-router-dom';

export function NavigationBar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex gap-2 mb-8">
      <Link
        to="/learning-progress"
        className={`px-6 py-2 rounded-lg transition-colors font-kameron-regular text-[16px] ${
          isActive('/learning-progress')
            ? 'bg-[#870022] text-white'
            : 'bg-white text-black border border-black hover:bg-gray-50'
        }`}
      >
        Learning Progress
      </Link>
      <Link
        to="/profile-settings"
        className={`px-6 py-2 rounded-lg transition-colors font-kameron-regular text-[16px] ${
          isActive('/profile-settings')
            ? 'bg-[#870022] text-white'
            : 'bg-white text-black border border-black hover:bg-gray-50'
        }`}
      >
        Profile Settings
      </Link>
      <Link
        to="/achievements"
        className={`px-6 py-2 rounded-lg transition-colors font-kameron-regular text-[16px] ${
          isActive('/achievements')
            ? 'bg-[#870022] text-white'
            : 'bg-white text-black border border-black hover:bg-gray-50'
        }`}
      >
        Achievements
      </Link>
    </div>
  );
}
