// SubscriptionPage.jsx
import { useState } from "react";
import { MonthlyPage } from "./Monthlypage";
import { AnnuallyPage } from "./Annuallypage";

export function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    // Note: I've updated the top padding class to 'pt-0' here, 
    // and applied padding inside the new header div for better control.
    <div className="subscription-page-bg min-h-screen"> 
      
      {/* New Header Section */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Subscription Plan
        </h1>
        <p className="text-lg text-gray-700">
          Try Our Premium Plan to enhance your learning experience with us.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-12"> {/* Reduced top margin since the header adds space */}
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-8 py-2 rounded-md font-semibold transition-colors ${
              billingCycle === "monthly"
                ? "bg-[#870022] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annually")}
            className={`px-8 py-2 rounded-md font-semibold transition-colors ${
              billingCycle === "annually"
                ? "bg-[#870022] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      {/* Render page based on toggle */}
      {billingCycle === "monthly" ? (
        <MonthlyPage billingCycle={billingCycle} />
      ) : (
        <AnnuallyPage billingCycle={billingCycle} />
      )}
    </div>
  );
}