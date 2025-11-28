import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { applyFontSize, applyInitialFontSize } from '../utils/fontSize.js';
import { fetchSettingsDefaults } from '../services/api.js';

const SETTINGS_STORAGE_KEY = 'cozyclip-settings';
const FONT_SIZE_STORAGE_KEY = 'cozyclip-font-size';

const defaultSettings = {
  // Reading Experience
  fontSize: 'medium',
  wordDefinition: false,
  readingRuler: false,
  autoSavePosition: false,
  showReadingStats: false,
  readingTimer: false,
  // Display
  theme: 'light',
  // Audio
  autoPlayAudio: false,
  // Notifications
  notifications: {
    dailyReminder: false,
    storyAlerts: false,
    achievements: false,
    emailNotifications: false,
    quizUpdates: false,
  },
  // Privacy
  privacy: {
    readingHistoryEnabled: false,
  },
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // Load persisted settings if available
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultSettings, ...parsed };
      }
    } catch (e) {
      // ignore parse errors
    }
    return { ...defaultSettings };
  });

  // Ensure font size is applied on mount from either storage or defaults
  useEffect(() => {
    // Prefer the context value, but ensure DOM reflects it
    const storedFont = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    const fontToApply = storedFont || settings.fontSize || defaultSettings.fontSize;
    applyFontSize(fontToApply);
  }, []);

  // Keep DOM font size in sync with context fontSize
  useEffect(() => {
    if (settings?.fontSize) {
      applyFontSize(settings.fontSize);
    }
  }, [settings.fontSize]);

  // Hydrate defaults from JSON if no persisted settings
  useEffect(() => {
    const hasStored = !!localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!hasStored) {
      fetchSettingsDefaults()
        .then((defaults) => {
          setSettings((prev) => ({ ...prev, ...defaults }));
          const fontToApply = defaults?.fontSize || settings?.fontSize || 'medium';
          applyFontSize(fontToApply);
        })
        .catch(() => {
          // silently ignore errors and keep existing defaults
        });
    }
  }, []);

  const resetAll = () => {
    setSettings({ ...defaultSettings });
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      localStorage.removeItem(FONT_SIZE_STORAGE_KEY);
    } catch (e) {}
    applyInitialFontSize();
  };

  const saveAll = () => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      if (settings?.fontSize) {
        localStorage.setItem(FONT_SIZE_STORAGE_KEY, settings.fontSize);
        applyFontSize(settings.fontSize);
      }
    } catch (e) {
      alert('Failed to save settings.');
    }
  };

  const value = useMemo(() => ({ settings, setSettings, resetAll, saveAll }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}