import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardNavbar = ({ profileImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [savedImage, setSavedImage] = useState(null);

  const location = useLocation();
  const coins = 0;

  const navItems = [
    { name: "Home", path: "/dashboardlayout" },
    { name: "Library", path: "/library" },
    { name: "Challenges", path: "/challenges" },
    { name: "Shop", path: "/shop" }
  ];

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current) setActiveItem(current.name);
  }, [location.pathname]);

  useEffect(() => {
    if (profileImage) {
      setSavedImage(profileImage);
      localStorage.setItem("profileImage", profileImage);
    } else {
      const stored = localStorage.getItem("profileImage");
      if (stored) setSavedImage(stored);
    }
  }, [profileImage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
  };

  return (
    <nav
      className="bg-[#870022] text-white flex items-center justify-between fixed top-0 left-0 w-full z-50 py-2 px-4 sm:px-8 lg:px-16 xl:px-24"
      style={{
        boxShadow:
          "56px 0 15px -5px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.2)"
      }}
    >
      <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 flex-shrink-0" />

      <div className="hidden lg:flex items-center font-medium space-x-20">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => handleNavClick(item.name)}
            className={`text-base lg:text-lg pb-1 border-b-2 transition-all duration-200 ${
              activeItem === item.name
                ? "border-white"
                : "border-transparent hover:border-gray-300 hover:scale-105"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        <div className="flex items-center space-x-2">
          <img src="/src/assets/coins.png" alt="Coin Icon" className="h-6 w-6" />
          <span className="text-base font-medium">{coins}</span>
        </div>

        <div className="rounded-full bg-white/80 p-[1px]">
          <img
            src={savedImage || "/profile.jpg"}
            alt="User Profile"
            className="h-10 w-10 rounded-full border-[1px] border-white object-cover"
          />
        </div>
      </div>

      <div className="flex lg:hidden items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <img src="/src/assets/coins.png" alt="Coin" className="h-5 w-5" />
          <span className="text-sm font-medium">{coins}</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="transition-transform duration-300 active:scale-90"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-[60px] right-0 lg:hidden bg-[#870022] w-[60%] sm:w-[50%] p-5 rounded-bl-xl shadow-lg flex flex-col items-center space-y-3">
          <img
            src={savedImage || "/profile.jpg"}
            alt="User Profile"
            className="h-14 w-14 rounded-full border-[1px] border-white object-cover mb-4"
          />

          {navItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.path}
                onClick={() => handleNavClick(item.name)}
                className="text-base sm:text-lg py-2 w-full text-white text-center"
              >
                {item.name}
              </Link>

              {index < navItems.length - 1 && (
                <div className="w-3/4 border-b border-gray-300 opacity-40 my-1.5"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
