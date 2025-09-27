import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { PricingToggle } from "@/components/PricingToggle";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const PricingCard = ({ 
  title,
  price,
  annualPrice,
  period = "/ month",
  description,
  features,
  highlighted = false,
  isFree = false,
  isEnterprise = false,
  isAnnual = false,
  buttonText,
  trialDays
}: { 
  title: string;
  price: string;
  annualPrice?: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  isFree?: boolean;
  isEnterprise?: boolean;
  isAnnual?: boolean;
  buttonText: string;
  trialDays?: string;
}) => {
  
  return (
    <Card className={`border ${highlighted ? 'border-sportbnk-green border-2 relative' : 'border-gray-200'} shadow-lg max-w-md mx-auto h-full flex flex-col`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sportbnk-green text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl font-bold text-sportbnk-navy">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-sportbnk-navy">
            {isFree ? price : isEnterprise ? price : isAnnual && annualPrice ? annualPrice : price}
          </span>
          {!isEnterprise && (
            <span className="text-gray-500 ml-2">
              {isAnnual && !isFree ? "/ year" : period}
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-4">{description}</p>
        {trialDays && (
          <p className="text-sm text-sportbnk-green font-medium mt-2">{trialDays}</p>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1 text-sportbnk-green">
                <Check size={16} />
              </div>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-6">
        {isEnterprise ? (
          <WaitlistDialog>
            <Button className="w-full bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white">
              {buttonText}
            </Button>
          </WaitlistDialog>
        ) : (
          <WaitlistDialog>
            <Button className={`w-full ${highlighted ? 'bg-sportbnk-green hover:bg-sportbnk-green/90' : 'bg-sportbnk-navy hover:bg-sportbnk-navy/90'} text-white`}>
              {buttonText}
            </Button>
          </WaitlistDialog>
        )}
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState("GBP");
  
  // Currency conversion rates and symbols
  const currencyData = {
    GBP: { symbol: "£", rate: 1 },
    EUR: { symbol: "€", rate: 1.17 }
  };

  const formatPrice = (basePrice: number) => {
    const convertedPrice = Math.round(basePrice * currencyData[currency as keyof typeof currencyData].rate);
    const symbol = currencyData[currency as keyof typeof currencyData].symbol;
    return `${symbol}${convertedPrice}`;
  };

  const freeTrialFeatures = [
    "Define 1 ICP (ideal customer profile)",
    "Basic Discover filters",
    "3 intent searches per day",
    "Export up to 25 contacts per month",
    "Email support",
    "14-day access"
  ];

  const standardFeatures = [
    "Define up to 3 ICPs",
    "All Discover filters",
    "10 intent searches per day",
    "Export up to 250 contacts per month",
    "Basic Signals (hiring + sponsorship)",
    "Email + chat support"
  ];

  const proFeatures = [
    "Define up to 10 ICPs",
    "25 intent searches per day",
    "Export up to 1,000 contacts per month",
    "Advanced Signals (tenders, grants, procurement, funding)",
    "CRM integrations (HubSpot, Salesforce, Pipedrive)",
    "Priority support"
  ];

  const enterpriseFeatures = [
    "Unlimited ICPs",
    "Unlimited searches + exports",
    "Custom data integrations",
    "Dedicated account manager",
    "Advanced security + compliance"
  ];

  const boltOns = [
    {
      title: "Extra Exports",
      description: "Purchase additional contact exports as you need them"
    },
    {
      title: "Signals Packs",
      description: "Unlock sector-specific intelligence (e.g. sponsorships, grants, tech procurement)"
    },
    {
      title: "API Credits",
      description: "Scale up your integrations with extra usage"
    },
    {
      title: "Custom Data Projects",
      description: "Commission bespoke research tailored to your ICP"
    }
  ];

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "Our 14-day free trial gives you access to core features with limited searches and exports. No credit card required."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes — you can cancel anytime. You'll retain access until the end of your billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, and bank transfer for Enterprise accounts."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes — annual subscriptions save 20% across all paid plans."
    },
    {
      question: "Can I scale my plan as my team grows?",
      answer: "Absolutely — you can upgrade, downgrade, or add bolt-ons at any time."
    }
  ];
  
  return (
    <PageLayout 
      pageTitle="Pricing - Sportbnk Plans & Pricing" 
      metaDescription="Simple, transparent pricing for Sportbnk. Choose from Free Trial, Standard, Pro, or Enterprise plans. Save 20% with annual billing."
      metaKeywords="Sportbnk pricing, sports data pricing, sports intelligence plans, subscription plans"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the plan that fits your business needs.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
              <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <PricingCard 
              title="Free Trial"
              price={formatPrice(0)}
              description="Try Sportbnk with limited features — no credit card required."
              features={freeTrialFeatures}
              isFree={true}
              isAnnual={isAnnual}
              buttonText="Start Free Trial"
              trialDays="14-day access"
            />
            
            <PricingCard 
              title="Standard Plan"
              price={formatPrice(49)}
              annualPrice={formatPrice(isAnnual ? 750 : 49)}
              description="For small teams starting to target and sell in sport."
              features={standardFeatures}
              isAnnual={isAnnual}
              buttonText="Get Started"
            />
            
            <PricingCard 
              title="Pro Plan"
              price={formatPrice(99)}
              annualPrice={formatPrice(isAnnual ? 2500 : 99)}
              description="For growing teams who need deeper signals and integrations."
              features={proFeatures}
              highlighted={true}
              isAnnual={isAnnual}
              buttonText="Upgrade to Pro"
            />

            <PricingCard 
              title="Enterprise"
              price="Custom Pricing"
              period=""
              description="For organisations with complex needs."
              features={enterpriseFeatures}
              isEnterprise={true}
              isAnnual={isAnnual}
              buttonText="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* Bolt-Ons Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Bolt-Ons
            </h2>
            <p className="text-lg text-gray-600">
              Enhance any plan with optional add-ons:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {boltOns.map((addon, index) => (
              <Card key={index} className="border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-3">{addon.title}</h3>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-sportbnk-navy hover:text-sportbnk-green">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;