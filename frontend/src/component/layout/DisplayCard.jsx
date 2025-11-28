import React from "react";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function DisplayCard() {
    const { settings, setSettings } = useSettings();
    const { theme } = settings;

    return (
        <div className="m-8 rounded-3xl shadow-lg border border-gray-200 p-4 transition-shadow duration-300 hover:shadow-xl w-full bg-gray-100">
            <div className="flex flex-col gap-4">
                {/* Reading Experience Section */}
                <div>
                    <h1 className="text-lg font-semibold mb-1">Display Settings</h1>
                    <p className="text-sm text-gray-700">
                        Personalized the visual appearance of your reading environment
                    </p>
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-medium">Theme</h3>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Color Theme</h3>
                        <p className="text-sm text-gray-700">Choose your preferred Theme</p>
                    </div>

                    {/* Dropdown */}
                    <select
                        className="border rounded-md p-1 text-sm w-full md:w-28 flex-2"
                        value={theme}
                        onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                    >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="auto">Auto</option>
                    </select>

                    <div className="flex flex-col flex-1"/>

                </div>

                {/* Global actions live on Settings page */}
            </div>
        </div>
    );
}
