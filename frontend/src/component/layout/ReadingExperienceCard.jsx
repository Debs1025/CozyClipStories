import React, { useEffect } from "react";
import { applyFontSize } from "../../utils/fontSize.js";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function ReadingExperienceCard() {
    const { settings, setSettings } = useSettings();
    const { fontSize, wordDefinition, readingRuler, autoSavePosition, showReadingStats, readingTimer } = settings;

    useEffect(() => {
        if (fontSize) applyFontSize(fontSize);
    }, [fontSize]);

    return (
        <div className="m-8 rounded-3xl shadow-lg border border-gray-200 p-4 transition-shadow duration-300 hover:shadow-xl w-full bg-gray-100">
            <div className="flex flex-col gap-4">
                {/* Reading Experience Section */}
                <div>
                    <h1 className="text-lg font-semibold mb-1">Reading Experience</h1>
                    <p className="text-sm text-gray-700">
                        Customize your Reading Experience for maximum comfort and comprehension
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Font Settings</h3>
                        <p className="text-sm text-gray-700">Adjust Text Size</p>
                    </div>

                    {/* Dropdown */}
                    <select
                        className="border rounded-md p-1 text-sm w-full md:w-28 flex-2"
                        value={fontSize}
                        onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>

                    <div className="flex flex-col flex-1"/>

                </div>

                <hr className="border-gray-300" />

                {/* Reading Aids */}
                <div>
                    <h3 className="text-md font-medium">Reading Aids</h3>
                </div>

                {/* Word Definition with dummy toggle */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Word Definition</h3>
                        <p className="text-sm text-gray-700">Shows Definition</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={wordDefinition}
                            onChange={(e) => setSettings(prev => ({ ...prev, wordDefinition: e.target.checked }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>

                {/* Reading Ruler with dummy toggle */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Reading Ruler</h3>
                        <p className="text-sm text-gray-700">Higher Current Line</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={readingRuler}
                            onChange={(e) => setSettings(prev => ({ ...prev, readingRuler: e.target.checked }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>


                {/* Auto Save Reading Position with dummy toggle */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Auto Save Reading Position</h3>
                        <p className="text-sm text-gray-700">Saves automatically where you ended</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={autoSavePosition}
                            onChange={(e) => setSettings(prev => ({ ...prev, autoSavePosition: e.target.checked }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>

                {/* Show Reading Stats with dummy toggle */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Show Reading Stats</h3>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showReadingStats}
                            onChange={(e) => setSettings(prev => ({ ...prev, showReadingStats: e.target.checked }))}
                        />
                        {/* Track */}
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                        {/* Knob */}
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
                    </label>

                    <div className="flex flex-col flex-1"/>
                </div>

                {/* Reading Timer with dummy toggle */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Reading Timer</h3>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={readingTimer}
                            onChange={(e) => setSettings(prev => ({ ...prev, readingTimer: e.target.checked }))}
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
