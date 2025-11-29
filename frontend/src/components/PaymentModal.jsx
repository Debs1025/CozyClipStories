import { X, CreditCard } from 'lucide-react';
import { useState } from 'react';

/**
 * PaymentModal Component
 * A modal for confirming a subscription payment with Stripe or PayPal.
 * It simulates a payment process and displays a success or failure status.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {function} onConfirm - Function to call when the payment is confirmed.
 * @param {string} planName - Name of the subscription plan.
 * @param {number} amount - Total amount to be paid.
 * @param {string} billingCycle - The billing cycle (e.g., 'monthly', 'annually').
 */
export function PaymentModal({ isOpen, onClose, onConfirm, planName, amount, billingCycle }) {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', or null

  if (!isOpen) return null;

  // --- Payment Simulation Logic ---
  const handlePaymentConfirmation = async () => {
    // Prevent multiple clicks and clear previous status
    if (isLoading) return;
    setIsLoading(true);
    setPaymentStatus(null);

    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demonstration: randomly simulate success (70%) or failure (30%)
    const isSuccess = Math.random() < 0.7;

    if (isSuccess) {
      setPaymentStatus('success');
      // Call the original onConfirm prop if a payment method was selected
      if (onConfirm) onConfirm(paymentMethod);
    } else {
      setPaymentStatus('failure');
    }

    setIsLoading(false);
  };
  // --- End of Payment Simulation Logic ---

  // Handle closing the modal and resetting state
  const handleClose = () => {
    setPaymentStatus(null);
    setIsLoading(false);
    onClose();
  };

  const statusMessage = {
    success: {
      text: 'Payment successful! You are now subscribed.',
      style: 'bg-green-100 text-green-700 border-green-300',
    },
    failure: {
      text: 'Payment failed. Please try a different method or check your details.',
      style: 'bg-red-100 text-red-700 border-red-300',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-transparent" onClick={handleClose} />

      {/* Modal - max-w-sm for smaller size */}
      <div className="relative bg-white opacity-100 rounded-lg shadow-xl max-w-sm w-full p-6 animate-fade-in">

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Complete Payment</h2>
          <p className="text-sm text-gray-600">Subscribe to {planName} plan</p>
        </div>

        {/* Status Message (Success/Failure Pop-up) */}
        {paymentStatus && (
          <div className={`p-3 mb-4 rounded-lg border text-sm font-medium ${statusMessage[paymentStatus].style}`}>
            {paymentStatus === 'success' ? '✅' : '❌'} {statusMessage[paymentStatus].text}
          </div>
        )}
        
        {/* Order Summary */}
        <div className="mb-5">
          <h3 className="text-base font-bold text-gray-900 mb-2">Order Summary:</h3>
          
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-700">Plan:</span>
            <span className="font-semibold text-gray-900">{planName}</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-700">Billing Cycle:</span>
            <span className="font-semibold text-gray-900 capitalize">{billingCycle}</span>
          </div>
          
          {/* Total Line */}
          <div className="flex justify-between items-center pt-2 mt-2">
            <span className="font-bold text-gray-900">Total:</span>
            <span className="font-bold text-[#870022] text-lg">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-5">
          <h3 className="text-base font-bold text-gray-900 mb-2">Select Payment Method:</h3>
          
          {/* Credit Card Option */}
          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors mb-2
            ${paymentMethod === 'stripe' ? 'border-[#870022] bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-[#870022]"
            />
            <CreditCard className="w-4 h-4 text-gray-600" />
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">Credit/Debit Card</div>
              <div className="text-xs text-gray-600">Pay securely with your card</div>
            </div>
          </label>

          {/* PayPal Option */}
          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
            ${paymentMethod === 'paypal' ? 'border-[#870022] bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 text-[#870022]"
            />
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">PP</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">PayPal</div>
              <div className="text-xs text-gray-600">Pay with your PayPal account</div>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentConfirmation}
            disabled={isLoading || paymentStatus === 'success'} // Disable after successful payment
            className="flex-1 px-3 py-1.5 bg-[#870022] text-white rounded-lg text-sm hover:bg-[#6d001b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : paymentStatus === 'success' ? (
              'Payment Complete'
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}