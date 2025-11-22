import { useState } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export function PasswordChangeModal({ onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-kameron-semibold text-[24px] text-black">Change Password</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="font-kameron-semibold text-[18px] text-black mb-2">
              Password Changed Successfully!
            </p>
            <p className="text-[14px] text-black/60">
              Your password has been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="mb-4">
              <label className="block font-kameron-regular text-[14px] text-black mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, currentPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, currentPassword: '' }));
                  }}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870022] ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-[12px] text-red-500">{errors.currentPassword}</p>
                </div>
              )}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block font-kameron-regular text-[14px] text-black mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, newPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, newPassword: '' }));
                  }}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870022] ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-[12px] text-red-500">{errors.newPassword}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block font-kameron-regular text-[14px] text-black mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870022] ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-[12px] text-red-500">{errors.confirmPassword}</p>
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-3 mb-6">
              <p className="text-[12px] text-black/70 mb-2">Password must contain:</p>
              <ul className="text-[11px] text-black/60 space-y-1">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One lowercase letter</li>
                <li>• One number</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-black py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span className="font-kameron-regular text-[14px]">Cancel</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#870022] text-white py-2 rounded-lg hover:bg-[#6b001b] transition-colors"
              >
                <span className="font-kameron-semibold text-[14px]">Change Password</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}