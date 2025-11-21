import { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

export function DeleteAccountModal({ onClose }) {
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }

    setIsDeleting(true);
    
    // Simulate account deletion
    setTimeout(() => {
      alert('Account deleted successfully. This is a demo - no actual deletion occurred.');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] p-6 max-w-md w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-kameron-semibold text-[24px] text-red-600">Delete Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div>
              <p className="font-kameron-semibold text-[16px] text-red-900 mb-2">
                Warning: This action cannot be undone!
              </p>
              <p className="text-[14px] text-red-800 leading-relaxed">
                Deleting your account will permanently remove:
              </p>
              <ul className="text-[13px] text-red-800 mt-2 space-y-1">
                <li>• All your reading progress and quiz history</li>
                <li>• Your achievements and badges</li>
                <li>• Your coins, gems, and unlocked items</li>
                <li>• Your bookmarks and saved content</li>
                <li>• All personal information and settings</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-kameron-regular text-[14px] text-black mb-2">
            Type <span className="font-kameron-semibold text-red-600">DELETE</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              setError('');
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Type DELETE"
            disabled={isDeleting}
          />
          {error && (
            <p className="text-[12px] text-red-500 mt-1">{error}</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-[12px] text-black/70 mb-2">
            <strong>Alternative:</strong> Instead of deleting, you can:
          </p>
          <ul className="text-[11px] text-black/60 space-y-1">
            <li>• Log out and take a break</li>
            <li>• Contact support if you're experiencing issues</li>
            <li>• Export your data before deletion (if needed)</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 bg-gray-100 text-black py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <span className="font-kameron-regular text-[14px]">Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="font-kameron-semibold text-[14px]">Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span className="font-kameron-semibold text-[14px]">Delete Account</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-black/50 mt-4">
          If you're sure, please proceed with caution
        </p>
      </div>
    </div>
  );
}