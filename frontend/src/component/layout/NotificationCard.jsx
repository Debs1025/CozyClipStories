import React from "react";
import { useSettings } from "../../context/SettingsContext.jsx";

export default function NotificationCard() {
    const { settings, setSettings } = useSettings();
    const { notifications } = settings;
    const { dailyReminder, storyAlerts, achievements, emailNotifications, quizUpdates } = notifications;
    return (
        <div className="m-8 rounded-3xl shadow-lg border border-gray-200 p-4 transition-shadow duration-300 hover:shadow-xl w-full bg-gray-100">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-lg font-semibold mb-1">Notifications</h1>
                    <p className="text-sm text-gray-700">
                        Manage how and when you receive notification
                    </p>
                </div>



                <div className="flex flex-col flex-1">
                    <h3 className="text-md font-medium">Push Notification</h3>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {/* Text section */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-md font-medium">Daily Reading Reminder</h3>
                        <p className="text-sm text-gray-700">Get reminded to read daily</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={dailyReminder}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, dailyReminder: e.target.checked } }))}
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
                        <h3 className="text-md font-medium">Story Alerts</h3>
                        <p className="text-sm text-gray-700">Notify when new stories are added or your interest</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={storyAlerts}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, storyAlerts: e.target.checked } }))}
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
                        <h3 className="text-md font-medium">Achievements Unlocked</h3>
                        <p className="text-sm text-gray-700">Celebrates your achievements</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={achievements}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, achievements: e.target.checked } }))}
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
                        <h3 className="text-md font-medium">Email Notification</h3>
                        <p className="text-sm text-gray-700">Notify to your email</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={emailNotifications}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, emailNotifications: e.target.checked } }))}
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
                        <h3 className="text-md font-medium">Quiz Notification</h3>
                        <p className="text-sm text-gray-700">Notify when quizzes are due</p>
                    </div>

                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer flex-2">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={quizUpdates}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, quizUpdates: e.target.checked } }))}
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
