import { useState } from 'react';
import { Camera, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  return (
    <img
      src={
        error
          ? "https://via.placeholder.com/150?text=No+Image"
          : src
      }
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export function ProfileForm({ onChangePassword, onDeleteAccount }) {
  const [formData, setFormData] = useState({
    name: 'Ashla Vinzon',
    email: 'avinzon@gbox.adnu.edu.ph',
    username: 'kweenYasmin'
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setSuccessMessage('');
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
    }

    if (!file.type.startsWith('image/')) {
      return setErrors(prev => ({ ...prev, avatar: 'Please upload an image file' }));
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setErrors(prev => ({ ...prev, avatar: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border border-black">
      <h2 className="font-kameron-semibold text-[30px] mb-6">Profile Settings</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-[14px] text-green-800">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block font-kameron-regular text-[16px] mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 bg-gray-100">
              {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" />
              ) : (
                <ImageWithFallback
                  src="profile.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <label className="bg-[#870022] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#6b001b] transition flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Upload Photo</span>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>

          {errors.avatar && (
            <div className="flex items-center gap-1 mt-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-[12px] text-red-500">{errors.avatar}</p>
            </div>
          )}

          <p className="text-[12px] text-black/60 mt-2">Maximum file size: 5MB</p>
        </div>

        {/* Name */}
        <InputField
          label="Full Name"
          value={formData.name}
          onChange={(v) => handleInputChange('name', v)}
          error={errors.name}
        />

        {/* Username */}
        <InputField
          label="Username"
          value={formData.username}
          onChange={(v) => handleInputChange('username', v)}
          error={errors.username}
        />

        {/* Email */}
        <InputField
          label="Email Address"
          value={formData.email}
          onChange={(v) => handleInputChange('email', v)}
          error={errors.email}
          type="email"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-[#870022] text-white py-3 rounded-lg hover:bg-[#6b001b] transition flex items-center justify-center gap-2 mt-6"
        >
          <Save className="w-5 h-5" />
          <span className="font-kameron-semibold text-[16px]">Save Changes</span>
        </button>

        {/* Account Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-kameron-semibold text-[18px] mb-4">Account Actions</h3>

          <button
            type="button"
            onClick={onChangePassword}
            className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition mb-3"
          >
            Change Password
          </button>

          <button
            type="button"
            onClick={onDeleteAccount}
            className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, value, onChange, error, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block font-kameron-regular text-[16px] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#870022] ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-[12px] text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
