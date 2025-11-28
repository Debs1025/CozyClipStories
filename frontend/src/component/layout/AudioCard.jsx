import React from "react";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function AudioCard() {
    const { settings, setSettings } = useSettings();
    const { autoPlayAudio } = settings;
    return (
        <div className="m-8 rounded-3xl shadow-lg border border-gray-200 p-4 transition-shadow duration-300 hover:shadow-xl w-full bg-gray-100">
            <div className="flex flex-col gap-4">
                {/* Audio Section */}
                <div>
                    <h1 className="text-lg font-semibold mb-1">Audio Settings</h1>
                    <p className="text-sm text-gray-700">
                        Control all audio and sound features
                    </p>
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-medium">Volume Controls</h3>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Auto-play Audio</h3>
                        <p className="text-sm text-gray-700">Enable read aloud feature</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={autoPlayAudio}
                            onChange={(e) => setSettings(prev => ({ ...prev, autoPlayAudio: e.target.checked }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>

                {/* Global actions live on Settings page */}
            </div>
        </div>
    );
}
