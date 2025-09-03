import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PricingToggle } from "@/components/PricingToggle";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useToast } from "@/hooks/use-toast";
import { usePricing } from "@/contexts/PricingContext";
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
  isAnnual = false
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
}) => {
  
  return (
    <Card className={`border ${highlighted ? 'border-sportbnk-green border-2' : 'border-gray-200'} shadow-lg max-w-md mx-auto`}>
      {highlighted && (
        <div className="bg-sportbnk-green text-white text-center py-1 text-sm font-medium">
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
      </CardHeader>
      <CardContent>
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
      <CardFooter className="pb-6">
        <WaitlistDialog className="w-full">
          <Button 
            className={`w-full ${
              highlighted ? 'bg-sportbnk-green hover:bg-sportbnk-green/90' : 
              isEnterprise ? 'bg-sportbnk-darkBlue hover:bg-sportbnk-darkBlue/90' :
              'bg-sportbnk-navy hover:bg-sportbnk-navy/90'
            } text-white`}
          >
            Join Waitlist
          </Button>
        </WaitlistDialog>
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState("GBP");
  const { toast } = useToast();
  const { freeTrialFeatures, standardFeatures, proFeatures, enterpriseFeatures } = usePricing();
  
  const handleSelectPlan = (planName: string, planPrice: string) => {
    toast({
      title: "Payment processing",
      description: `You've selected the ${planName} plan (${planPrice}). Stripe integration will be added soon.`,
      duration: 5000,
    });
    
    console.log(`Selected plan: ${planName}, Price: ${planPrice}`);
  };

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
  
  return (
    <PageLayout pageTitle="Pricing">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the plan that works best for your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
              <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
              <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <PricingCard 
              title="Free Trial"
              price="£0"
              description="Try our platform with limited features at no cost"
              features={freeTrialFeatures}
              isFree={true}
              isAnnual={isAnnual}
            />
            
            <PricingCard 
              title="Standard Plan"
              price={formatPrice(49)}
              annualPrice={formatPrice(470)}
              description="All the features you need to grow your business in the sports industry"
              features={standardFeatures}
              isAnnual={isAnnual}
            />
            
            <PricingCard 
              title="Pro Plan"
              price={formatPrice(99)}
              annualPrice={formatPrice(950)}
              description="Enhanced features and support for growing teams and enterprises"
              features={proFeatures}
              highlighted={true}
              isAnnual={isAnnual}
            />

            <PricingCard 
              title="Enterprise"
              price="Custom"
              period=""
              description="Tailored solutions for large organisations with custom requirements"
              features={enterpriseFeatures}
              isEnterprise={true}
              isAnnual={isAnnual}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                How does the 7-day free trial work?
              </h3>
              <p className="text-gray-600">
                Our 7-day free trial gives you full access to all features. No credit card is required to start, and you can upgrade to the paid plan at any time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                Can I cancel my subscription at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, including Visa, Mastercard, and American Express.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                Do you offer discounts for annual billing?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 20% discount when you choose annual billing for either plan. Contact our sales team for more details.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Have questions about our pricing?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is here to help you determine if our solution is right for your business.
            </p>
            <WaitlistDialog>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg">
                Join Waitlist
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
