import React, { useState, useEffect } from "react";
import DashboardNavbar from "./DashboardNavbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Upload, Camera } from "lucide-react";

const Dashboard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [levelProgress, setLevelProgress] = useState(0);
  const [completedProgress, setCompletedProgress] = useState(0);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F3EBE2] text-white mt-1">
      <DashboardNavbar profileImage={profileImage} />

      <div>
        <Sidebar />

        <main className="flex-1 flex justify-end p-6 overflow-auto">
          <div
            className="flex items-center justify-between w-full h-[180px] rounded-2xl overflow-hidden shadow-2xl relative"
            style={{
              backgroundImage: "url('/src/assets/bronze.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative flex items-center w-1/2 p-8 space-x-6 backdrop-blur-[2px] z-10">
              <label
                htmlFor="profile-upload"
                className="relative w-40 h-32 bg-gray-700/80 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden border border-gray-600 transition hover:border-blue-400"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <Upload size={32} />
                    <span className="text-xs mt-1">Upload</span>
                  </div>
                )}

                <div className="absolute bottom-1 right-1">
                  <Camera size={18} className="text-white drop-shadow-sm" />
                </div>

                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              <div className="w-full">
                <h2 className="text-2xl font-semibold text-white drop-shadow-md">Jame</h2>

                <div className="flex items-center text-sm text-gray-200 mt-1 space-x-2">
                  <span>jame@email.com</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="text-amber-400 font-medium">Bronze I</span>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>LVL</span>
                      <span>{levelProgress}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-[#c2a27a]/40 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${levelProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Completed</span>
                      <span>{Math.round(completedProgress / 10)}/10</span>
                    </div>
                    <div className="relative w-full h-2 bg-[#c2a27a]/40 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-[#d9a86c] rounded-full transition-all duration-500"
                        style={{ width: `${completedProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-1/2 p-8 flex flex-col justify-center z-10 text-right">
              <h3 className="text-xl font-semibold text-white drop-shadow-md">
                Unlock Stories. Level Up Learning.
              </h3>
              <p className="text-sm text-gray-200 mt-3 drop-shadow-sm">
                Story-driven games make reading fun and rewarding through interactive, anytime learning.
              </p>
              <img
                src="/src/assets/dragon.png"
                alt="Dragon"
                className="absolute bottom-3 right-3 w-24 h-24 object-contain opacity-90"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
