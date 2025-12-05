import { useState } from 'react';

export default function Settings() {
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    studentProgressAlerts: true,
    weeklyReports: false,
    assignmentReminders: true,
    studentProgressVisibility: 'everyone',
    shareStatistics: true,
  });

  const [originalSettings, setOriginalSettings] = useState({ ...settings });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    setOriginalSettings({ ...settings });
    setHasChanges(false);
  };

  const handleCancel = () => {
    setSettings({ ...originalSettings });
    setHasChanges(false);
  };

  const handleChangePassword = () => setShowPasswordModal(true);
  const handleDeleteAccount = () => setShowDeleteModal(true);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#2c1810]">Account Settings</h1>
          <p className="text-[#5a4a3a] text-sm mt-1">Manage your preferences and privacy</p>
        </div>
        {hasChanges && (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 bg-white border border-[#8B1538] text-[#8B1538] rounded-lg hover:bg-[#f5f0e8] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#8B1538] text-white rounded-lg hover:bg-[#701229] transition-all"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[#2c1810] mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'studentProgressAlerts', label: 'Student Progress Alerts', desc: 'Get notified of student achievements' },
              { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
              { key: 'assignmentReminders', label: 'Assignment Reminders', desc: 'Reminders for pending assignments' },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-[#fffbf0] border-2 border-[#f4d58d] rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-[#2c1810]">{item.label}</p>
                  <p className="text-[#5a4a3a] text-sm">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B1538]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[#2c1810] mb-6">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="bg-[#fffbf0] border-2 border-[#f4d58d] rounded-xl p-4">
              <p className="text-[#2c1810] mb-4">Student Progress Visibility</p>
              <div className="space-y-3">
                {[
                  { value: 'everyone', label: 'Everyone', desc: 'All teachers and parents can view' },
                  { value: 'parents', label: 'Parents Only', desc: 'Only parents can view progress' },
                  { value: 'private', label: 'Private', desc: 'Only you can view' },
                ].map((option) => (
                  <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      checked={settings.studentProgressVisibility === option.value}
                      onChange={() => handleSettingChange('studentProgressVisibility', option.value)}
                      className="w-5 h-5 text-[#8B1538] mt-0.5 accent-[#8B1538]"
                    />
                    <div>
                      <p className="text-[#2c1810]">{option.label}</p>
                      <p className="text-[#5a4a3a] text-sm">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Share Statistics */}
            <div className="bg-[#fffbf0] border-2 border-[#f4d58d] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[#2c1810]">Share Statistics</p>
                <p className="text-[#5a4a3a] text-sm">Allow sharing of class statistics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.shareStatistics}
                  onChange={(e) => handleSettingChange('shareStatistics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B1538]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-[#2c1810] mb-6">Security</h2>
          <div className="space-y-4">
            <div className="bg-[#fffbf0] border border-[#f4d58d] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[#2c1810]">Password</p>
                <p className="text-[#5a4a3a] text-sm">Last changed 30 days ago</p>
              </div>
              <button
                onClick={handleChangePassword}
                className="px-6 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#701229] transition-all"
              >
                Change Password
              </button>
            </div>

            <div className="bg-[#fffbf0] border border-[#f4d58d] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[#2c1810]">Account</p>
                <p className="text-[#5a4a3a] text-sm">Permanently delete your account</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#701229] transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Data Privacy Note */}
        <div className="bg-[#fffbf0] border-2 border-[#f4d58d] rounded-xl p-6">
          <h3 className="text-[#2c1810] mb-3">Note on Data Privacy</h3>
          <p className="text-[#5a4a3a] text-sm leading-relaxed">
            CozyClips is committed to protecting your privacy and the privacy of your students. We do not collect personally identifiable information (PII) or store sensitive data. All settings and preferences are stored locally and can be modified at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
