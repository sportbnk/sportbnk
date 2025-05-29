
import React, { createContext, useContext, ReactNode } from 'react';

interface PricingContextType {
  proFeatures: string[];
  standardFeatures: string[];
  freeTrialFeatures: string[];
  enterpriseFeatures: string[];
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider = ({ children }: PricingProviderProps) => {
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

  const value: PricingContextType = {
    proFeatures,
    standardFeatures,
    freeTrialFeatures,
    enterpriseFeatures,
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};
