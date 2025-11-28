import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onCancel?.();
  };

  const container = document.getElementById('modal-root') || document.body;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5">
        {title && (
          <h2 id="confirm-dialog-title" className="text-lg font-semibold mb-3">
            {title}
          </h2>
        )}
        <div className="text-sm text-gray-700 mb-5">{children}</div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-[#870022] text-white hover:bg-[#6c001b]"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    container
  );
}

export default ConfirmDialog;