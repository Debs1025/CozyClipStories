import { useState, useRef } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    emailAddress: "",
    credentials: "",
    specialization: "",
    yearsOfExperience: "",
    bio: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please select an image under 5MB",
      });
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      toast.success("Avatar updated!", {
        description: "Your profile picture has been updated.",
      });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address",
      });
      return;
    }

    setOriginalData({ ...formData });
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved.",
    });
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#2c1810] text-2xl font-semibold">Teacher Profile</h1>
          <p className="text-[#5a4a3a] text-sm mt-1">Manage your profile and credentials</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-2.5 bg-[#8B1538] text-white rounded-lg hover:bg-[#701229] transition-all"
          >
            Edit Profile
          </button>
        ) : (
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

      <div className="bg-white rounded-2xl p-6">
        <h2 className="text-[#2c1810] mb-6">Teaching Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: 28 },
            { label: "Active Classes", value: 4 },
            { label: "Avg. Class Score", value: "87.5%" },
            { label: "Years Teaching", value: 12 },
          ].map((stat) => (
            <div key={stat.label} className="border-2 border-[#f4d58d] rounded-xl p-4 bg-[#fffbf0]">
              <div className="w-12 h-12 bg-[#d4c5b0] rounded-lg mb-3"></div>
              <p className="text-[#2c1810] text-2xl mb-1">{stat.value}</p>
              <p className="text-[#5a4a3a] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 space-y-6">
          <h2 className="text-[#2c1810] mb-6">Basic Information</h2>

          <div className="flex items-start gap-4">
            <div>
              <label className="block text-[#2c1810] text-sm mb-2">Profile Avatar</label>
              <div
                onClick={handleAvatarClick}
                className={`w-24 h-24 rounded-full overflow-hidden bg-gray-200 ${
                  isEditing ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
                }`}
              >
                <img
                  src={avatarPreview || "profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={uploading}
                  className="mt-2 px-4 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#701229] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {uploading ? "Uploading..." : "Change Avatar"}
                </button>
              )}
            </div>
          </div>

          {[
            { label: "Full Name", key: "fullName", type: "text" },
            { label: "Phone Number", key: "phoneNumber", type: "tel" },
            { label: "Location", key: "location", type: "text" },
            { label: "Email Address", key: "emailAddress", type: "email" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-[#2c1810] text-sm mb-2">{field.label}</label>
              <input
                type={field.type}
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] text-[#2c1810] disabled:opacity-100"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 space-y-6">
          <h2 className="text-[#2c1810] mb-6">Teaching Credentials</h2>
          {[
            { label: "Credentials", key: "credentials" },
            { label: "Specialization", key: "specialization" },
            { label: "Years of Experience", key: "yearsOfExperience" },
            { label: "Bio", key: "bio", type: "textarea" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-[#2c1810] text-sm mb-2">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  rows={5}
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] text-[#2c1810] disabled:opacity-100 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-[#e8dcc8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] text-[#2c1810] disabled:opacity-100"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
