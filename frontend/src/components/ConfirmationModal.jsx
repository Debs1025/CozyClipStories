import { X, AlertCircle } from 'lucide-react';

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop: Changed to bg-transparent to remove dimming */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />

      {/* Modal: Changed max-w-md to max-w-sm for smaller size, reduced padding from p-6 to p-5 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-5 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon: Reduced margin bottom from mb-4 to mb-3 for tighter spacing */}
        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
          <AlertCircle className="w-6 h-6 text-orange-600" />
        </div>

        {/* Content: Reduced margin bottom from mb-6 to mb-5 for tighter spacing */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Action Buttons: Reduced gap from gap-3 to gap-2, and reduced button sizes */}
        <div className="flex gap-2">
          {/* Cancel Button: Reduced padding and added text-sm */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          {/* Confirm Button: Reduced padding and added text-sm, updated spinner size/gap */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-3 py-1.5 bg-[#870022] text-white rounded-lg text-sm hover:bg-[#6d001b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              confirmText || 'Confirm'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}