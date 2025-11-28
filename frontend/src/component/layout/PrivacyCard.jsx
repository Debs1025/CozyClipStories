import React from "react";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function PrivacyCard() {
    const { settings, setSettings } = useSettings();
    const { privacy } = settings;
    const { readingHistoryEnabled } = privacy;
    return (
        <div className="m-8 rounded-3xl shadow-lg border border-gray-200 p-4 transition-shadow duration-300 hover:shadow-xl w-full bg-gray-100">
            <div className="flex flex-col gap-4">
                {/* Audio Section */}
                <div>
                    <h1 className="text-lg font-semibold mb-1">Privacy & Data</h1>
                    <p className="text-sm text-gray-700">
                        Control your data and privacy settings
                    </p>
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-medium">privacy & Data</h3>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Reading History</h3>
                        <p className="text-sm text-gray-700">Track stories you read</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={readingHistoryEnabled}
                            onChange={(e) => setSettings(prev => ({ ...prev, privacy: { ...prev.privacy, readingHistoryEnabled: e.target.checked } }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>




                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Clear Reading History</h3>
                        <p className="text-sm text-gray-700">Delete all reading history</p>
                    </div>
                    {/* Button takes only its width */}
                    <div className="flex flex-col items-start flex-2">
                        <button className="w-24 cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                            Clear
                        </button>
                    </div>
                    {/* Empty right column */}
                    <div className="flex flex-col flex-1" />
                </div>


                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Export Personal Data</h3>
                        <p className="text-sm text-gray-700">Download all your data</p>
                    </div>
                    {/* Button takes only its width */}
                    <div className="flex flex-col items-start flex-2">
                        <button className="w-24 cursor-pointer px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition">
                            Export
                        </button>
                    </div>
                    {/* Empty right column */}
                    <div className="flex flex-col flex-1" />
                </div>


                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Account Deletion</h3>
                    </div>
                    {/* Button takes only its width */}
                    <div className="flex flex-col items-start flex-2">
                        <button className=" w-24 cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                            View
                        </button>
                    </div>
                    {/* Empty right column */}
                    <div className="flex flex-col flex-1" />
                </div>

                {/* Global actions live on Settings page */}

            </div>
        </div>
    );
}
