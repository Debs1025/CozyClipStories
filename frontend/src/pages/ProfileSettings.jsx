import { useState } from 'react';
import { ProfileForm } from '../components/ProfileForm';
import { AvatarCustomization } from '../components/AvatarCustomization';
import { PasswordChangeModal } from '../components/PasswordChangeModal';
import { DeleteAccountModal } from '../components/DeleteAccountModal';
import ccLogo from "../assets/cclogo.png";
import profileImg from "../assets/profile.png";

export default function ProfileSettings() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      {/* Header with Logo */}
      <div className="flex items-center gap-4 mb-8">

        <h1 className="font-kameron-semibold text-[45px] text-black">
          Profile Settings
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Left Side: Profile Form */}
        <div>
          <ProfileForm
            onChangePassword={() => setShowPasswordModal(true)}
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        </div>

        {/* Right Side: Avatar Customization */}
        <div>
          <AvatarCustomization profileImg={profileImg} />
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <PasswordChangeModal onClose={() => setShowPasswordModal(false)} />
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}
