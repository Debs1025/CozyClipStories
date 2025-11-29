import { Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function SubscriptionStatus({ subscription, onRenew, onCancel, isLoading }) {
  if (!subscription) return null;

  const isActive = subscription.status === 'active';
  const isCancelled = subscription.status === 'cancelled';
  const expirationDate = new Date(subscription.expirationDate);
  const today = new Date();
  const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysUntilExpiration <= 7 && daysUntilExpiration > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Subscription</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#870022]">
              {subscription.planName}
            </span>
            <span className="text-gray-500">
              ({subscription.billingCycle})
            </span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isActive && !isCancelled && (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-semibold">Active</span>
            </>
          )}
          {isCancelled && (
            <>
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-semibold">Cancelled</span>
            </>
          )}
        </div>
      </div>

      {/* Subscription Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm">
            <strong>Started:</strong> {new Date(subscription.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm">
            <strong>Expires:</strong> {expirationDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Expiration Warning */}
      {isExpiringSoon && isActive && !isCancelled && (
        <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-900">
              Your subscription expires in {daysUntilExpiration} day{daysUntilExpiration !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-orange-700">
              {subscription.autoRenew
                ? 'Your subscription will auto-renew automatically.'
                : 'Renew now to continue enjoying premium features.'}
            </p>
          </div>
        </div>
      )}

      {/* Auto-Renew Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Auto-Renew:</span>
          <span className={`text-sm font-semibold ${subscription.autoRenew ? 'text-green-600' : 'text-gray-500'}`}>
            {subscription.autoRenew ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {!subscription.autoRenew && isActive && !isCancelled && (
          <button
            onClick={onRenew}
            disabled={isLoading}
            className="px-6 py-2 bg-[#870022] text-white rounded-lg hover:bg-[#6d001b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Renew Now'}
          </button>
        )}
        
        {isActive && !isCancelled && (
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Cancel Subscription'}
          </button>
        )}

        {isCancelled && (
          <div className="text-sm text-gray-600">
            Your subscription has been cancelled and will remain active until{' '}
            <strong>{expirationDate.toLocaleDateString()}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
