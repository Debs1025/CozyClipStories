// src/page/Settings.jsx
import React, { useState } from 'react';
import SideCard from "../component/layout/SideCard.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import ReadingExperienceCard from "../component/layout/ReadingExperienceCard.jsx";
import AudioCard from "../component/layout/AudioCard.jsx";
import NotificationCard from "../component/layout/NotificationCard.jsx";
import PrivacyCard from "../component/layout/PrivacyCard.jsx";
import { SettingsProvider, useSettings } from "../context/SettingsContext.jsx";
import ConfirmDialog from "../component/common/ConfirmDialog.jsx";

function SettingsActions() {
    const { resetAll, saveAll } = useSettings();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState(null);

    const openConfirm = (type) => {
        setConfirmType(type);
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        if (confirmType === 'reset') {
            resetAll();
        } else if (confirmType === 'save') {
            saveAll();
        }
        setConfirmOpen(false);
    };

    return (
        <div className="w-full flex justify-end gap-2 mb-4">
            <button
                onClick={() => openConfirm('reset')}
                className="px-3 py-2 text-sm font-medium bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
                Reset Settings
            </button>
            <button
                onClick={() => openConfirm('save')}
                className="px-4 py-2 bg-[#870022] text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
                Save Changes
            </button>

            <ConfirmDialog
                open={confirmOpen}
                title={confirmType === 'reset' ? 'Reset All Settings?' : 'Save Changes?'}
                confirmLabel={confirmType === 'reset' ? 'Reset' : 'Save'}
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
                onCancel={() => setConfirmOpen(false)}
            >
                {confirmType === 'reset' ? (
                    <p>All settings will be restored to defaults. This can’t be undone.</p>
                ) : (
                    <p>Save your current changes to settings?</p>
                )}
            </ConfirmDialog>
        </div>
    );
}

function Settings() {
    return (
        <SettingsProvider>
            <div className="w-full flex flex-col md:flex-row items-start gap-1">
                <SideCard/>

                <div className="flex-1 p-4">
                    <SettingsActions />
                    <Routes>
                        {/* Default: when visiting /settings, redirect to Reading Experience */}
                        <Route index element={<Navigate to="reading-experiences" replace />} />
                        <Route path="reading-experiences" element={<ReadingExperienceCard/>}/>
                        <Route path="audio" element={<AudioCard/>}/>
                        <Route path="notification" element={<NotificationCard/>}/>
                        <Route path="privacy" element={<PrivacyCard/>}/>
                        <Route path="*" element={<p>Select a setting from the left sidebar.</p>}/>
                    </Routes>
                </div>

            </div>
        </SettingsProvider>
    );
}

export default Settings;
