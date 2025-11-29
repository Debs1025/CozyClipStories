// AnnuallyPage.jsx
import React, { useState } from 'react';
import { PlanCard } from "../components/PlanCard";
import { SubscriptionStatus } from "../components/SubscriptionStatus";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { PaymentModal } from "../components/PaymentModal";

export function AnnuallyPage({ billingCycle }) {
  // --- Subscription State ---
  const [currentSubscription, setCurrentSubscription] = useState({
    planName: "Premium",
    billingCycle: "Annually",
    status: "expired",
    startDate: "2023-03-18T00:00:00Z",
    expirationDate: "2024-03-25T00:00:00Z",
    autoRenew: true
  });

  // --- Loading & Modal States ---
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState({
    name: '',
    amount: 0,
    cycle: 'annually'
  });

  // --- Plan Data ---
  const plans = [
    {
      id: "free",
      name: "FREE",
      price: { monthly: 0, annually: 0 },
      features: [
        { name: "Unlock other abilities.", included: true },
        { name: "Gain more rewards.", included: false },
        { name: "Unlock premium quests.", included: false },
        { name: "Unlimited avatar change.", included: false },
        { name: "Unlock premium avatars.", included: false },
      ],
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: { monthly: 9.99, annually: 99.99 },
      features: [
        { name: "Unlock other abilities.", included: true },
        { name: "Gain more rewards.", included: true },
        { name: "Unlock premium quests.", included: true },
        { name: "Unlimited avatar change.", included: false },
        { name: "Unlock premium avatars.", included: false },
      ],
    },
    {
      id: "teacher",
      name: "TEACHER",
      price: { monthly: 19.99, annually: 199.99 },
      features: [
        { name: "Unlock other abilities.", included: true },
        { name: "Gain more rewards.", included: true },
        { name: "Unlock premium quests.", included: true },
        { name: "Unlimited avatar change.", included: true },
        { name: "Unlock premium avatars.", included: true },
      ],
    },
  ];

  // --- Handlers ---
  const handleRenew = () => {
    const premiumPlan = plans.find(p => p.id === 'premium');
    if (premiumPlan) handlePlanSelect(premiumPlan);
  };

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancellation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSubscription({
        ...currentSubscription,
        status: 'cancelled',
        autoRenew: false
      });
      setIsLoading(false);
      setIsCancelModalOpen(false);
    }, 1500);
  };

  const handlePlanSelect = (plan) => {
    if (plan.name.toUpperCase() === currentSubscription.planName.toUpperCase()) {
      console.log("Already on this plan.");
      return;
    }

    // Free plan handling
    if (plan.price.annually === 0) {
      setCurrentSubscription({
        planName: plan.name,
        billingCycle: 'Annually',
        status: 'active',
        startDate: new Date().toISOString(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        autoRenew: false
      });
      return;
    }

    // Paid plan: open payment modal
    setSelectedPlanDetails({
      name: plan.name,
      amount: plan.price.annually,
      cycle: 'annually',
    });
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSubscription({
        planName: selectedPlanDetails.name,
        billingCycle: 'Annually',
        status: 'active',
        startDate: new Date().toISOString(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        autoRenew: true
      });
      setIsLoading(false);
      setIsPaymentModalOpen(false);
    }, 2000);
  };

  return (
    <div className="subscription-container">
      {/* Subscription Status */}
      <SubscriptionStatus
        subscription={currentSubscription}
        onRenew={handleRenew}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle="annually"
            onSelect={() => handlePlanSelect(plan)}
            isCurrentPlan={
              plan.name.toUpperCase() === currentSubscription.planName.toUpperCase() &&
              currentSubscription.billingCycle.toUpperCase() === 'ANNUALLY'
            }
            isLoading={false}
          />
        ))}
      </div>

      {/* Cancellation Confirmation Modal */}
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancellation}
        title="Confirm Cancellation"
        message={`Are you sure you want to cancel your ${currentSubscription.planName} subscription? Your plan will remain active until the expiration date: ${new Date(currentSubscription.expirationDate).toLocaleDateString()}.`}
        confirmText="Yes, Cancel"
        isLoading={isLoading}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleConfirmPayment}
        planName={selectedPlanDetails.name}
        amount={selectedPlanDetails.amount}
        billingCycle={selectedPlanDetails.cycle}
        isLoading={isLoading}
      />
    </div>
  );
}
