import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AudioIcon from "../../assets/sidebar/audioIcon.png";
import BookIcon from "../../assets/sidebar/bookIcon.png";
import DisplayIcon from "../../assets/sidebar/displayIcon.png";
import NotificationIcon from "../../assets/sidebar/notificationIcon.png";
import PrivacyIcon from "../../assets/sidebar/privacyIcon.png";

export default function SidebarCard() {
    const navigate = useNavigate();
    const location = useLocation();

    const buttons = [
        { label: "Reading Experience", icon: BookIcon, path: "/settings/reading-experiences" },
        { label: "Audio", icon: AudioIcon, path: "/settings/audio" },
        { label: "Notification", icon: NotificationIcon, path: "/settings/notification" },
        { label: "Privacy", icon: PrivacyIcon, path: "/settings/privacy" },
    ];

    return (
        <div className="m-4 md:m-8 rounded-3xl shadow-lg border border-gray-200 p-3 transition-shadow duration-300 hover:shadow-xl w-full md:max-w-[18rem] bg-gray-100">
            <div className="flex flex-col gap-2">
                {buttons.map((btn, idx) => {
                    const isActive = location.pathname === btn.path;
                    return (
                        <button
                            key={idx}
                            onClick={() => navigate(btn.path)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                                ${isActive ? "bg-[#870022] text-white" : "text-black hover:bg-[#870022] hover:text-white"}`}
                        >
                            <img src={btn.icon} alt={btn.label} className="h-5 w-5" />
                            {btn.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
