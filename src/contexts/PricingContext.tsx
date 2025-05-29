
import React, { createContext, useContext } from 'react';

interface PricingPlan {
  name: string;
  features: string[];
}

interface PricingContextType {
  freeTrialFeatures: string[];
  standardFeatures: string[];
  proFeatures: string[];
  enterpriseFeatures: string[];
  plans: {
    freeTrial: PricingPlan;
    standard: PricingPlan;
    pro: PricingPlan;
    enterprise: PricingPlan;
  };
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const freeTrialFeatures = [
    "Access to basic Discover tool filters",
    "Limited data enrichment with Boost",
    "5 searches per day",
    "Export up to 50 contacts per month",
    "Email support",
    "No credit card required",
    "14-day access",
  ];

  const standardFeatures = [
    "Access to Discover tool with all filters",
    "Access to Boost for data enrichment",
    "Unlimited searches",
    "Export up to 1,000 contacts per month",
    "CRM integration (HubSpot, Salesforce)",
    "Email and chat support",
    "Cancel anytime"
  ];
  
  const proFeatures = [
    "All Standard features",
    "Export up to 5,000 contacts per month",
    "Advanced data analytics dashboard",
    "API access for custom integrations",
    "Dedicated account manager",
    "Priority support response",
    "Custom training sessions",
    "Team collaboration tools"
  ];

  const enterpriseFeatures = [
    "All Pro features",
    "Unlimited data exports",
    "Custom data models and integrations",
    "Advanced security features",
    "Dedicated support team",
    "SLA guarantees",
    "Customized training program",
    "White-labeling options",
    "Priority feature development"
  ];

  const plans = {
    freeTrial: { name: "Free Trial", features: freeTrialFeatures },
    standard: { name: "Standard Plan", features: standardFeatures },
    pro: { name: "Pro Plan", features: proFeatures },
    enterprise: { name: "Enterprise", features: enterpriseFeatures }
  };

  const value: PricingContextType = {
    freeTrialFeatures,
    standardFeatures,
    proFeatures,
    enterpriseFeatures,
    plans
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};
