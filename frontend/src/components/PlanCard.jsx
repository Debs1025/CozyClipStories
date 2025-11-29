import { Check, X } from 'lucide-react';

export function PlanCard({
  plan = { features: [], price: { monthly: 0, annually: 0 }, name: '' },
  billingCycle = 'monthly',
  onSelect,
  isCurrentPlan = false,
  isLoading = false,
}) {
  const price = billingCycle === 'monthly' ? plan.price?.monthly ?? 0 : plan.price?.annually ?? 0;
  const isFree = price === 0;

  const buttonDisabled = isCurrentPlan || isLoading;

  // Determine button styles based on status
  let buttonClasses = 'bg-[#870022] text-white hover:bg-[#6d001b]'; // Default Select (Dark Red)
  let buttonText = 'Select Plan';

  if (isCurrentPlan) {
    // Current Plan button styling (matching the light gray "CURRENT PLAN" button from original plans section)
    buttonClasses = 'bg-gray-400 text-gray-700 cursor-not-allowed'; 
    buttonText = 'CURRENT PLAN';
  } else if (isLoading) {
    // Loading state styling
    buttonClasses = 'bg-[#870022] text-white disabled:opacity-50 disabled:cursor-not-allowed';
    buttonText = (
      <span className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Processing...
      </span>
    );
  }

  // Handle Free Plan Select Button (which should also be Red like the original image)
  if (isFree && !isCurrentPlan) {
    buttonClasses = 'bg-[#870022] text-white hover:bg-[#6d001b]';
  }


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col">
      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-[#870022]">${price.toFixed(2)}</span>
          <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-1 space-y-3 mb-6">
        {(plan.features || []).map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            {feature.included ? (
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
              {feature.name}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={() => !buttonDisabled && onSelect()}
        disabled={buttonDisabled}
        // Apply the pre-calculated classes
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClasses}`}
      >
        {/* Render pre-calculated button text/content */}
        {buttonText}
      </button>
    </div>
  );
}