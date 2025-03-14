import { useState } from 'react';
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCard = ({ 
  name, 
  price, 
  description, 
  features,
  isPopular = false,
  buttonText = "Get Started"
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}) => (
  <Card className={`border ${isPopular ? 'border-sportbnk-green shadow-lg' : 'border-gray-200'} h-full flex flex-col`}>
    <CardHeader className="pb-4">
      {isPopular && (
        <Badge className="w-fit mb-2 bg-sportbnk-green text-white hover:bg-sportbnk-green/90">
          Most Popular
        </Badge>
      )}
      <CardTitle className="text-2xl font-bold text-sportbnk-navy">{name}</CardTitle>
      <div className="mt-2">
        <span className="text-3xl font-bold text-sportbnk-navy">{price}</span>
        {price !== "Custom" && (
          <span className="text-gray-500 ml-2">/ month</span>
        )}
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
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
    <CardFooter>
      <Button 
        className={`w-full ${isPopular 
          ? 'bg-sportbnk-green hover:bg-sportbnk-green/90 text-white' 
          : 'bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white'}`}
      >
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  return (
    <PageLayout pageTitle="Pricing">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs, with no hidden fees or long-term commitments.
            </p>
            
            <div className="flex items-center justify-center mt-8 space-x-2">
              <span className={`text-sm ${!isAnnual ? 'font-medium text-sportbnk-navy' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isAnnual ? 'bg-sportbnk-green' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'font-medium text-sportbnk-navy' : 'text-gray-500'}`}>
                Annual <span className="text-sportbnk-green">(20% off)</span>
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              name="Free Trial" 
              price="$0"
              description="Try out our platform for 7 days with limited features."
              features={[
                "Access to Discover tool with basic filters",
                "Limited number of searches",
                "Export up to 50 contacts",
                "Email support"
              ]}
              buttonText="Start Free Trial"
            />
            
            <PricingCard 
              name="Professional" 
              price={isAnnual ? "$99" : "$129"}
              description="Full access to all tools and data, ideal for medium-sized enterprises."
              features={[
                "Full access to Discover with advanced filters",
                "Access to Boost for data enrichment",
                "Unlimited searches",
                "Export up to 1,000 contacts per month",
                "CRM integration (HubSpot, Salesforce)",
                "Priority email & chat support"
              ]}
              isPopular={true}
              buttonText="Start 7-Day Free Trial"
            />
            
            <PricingCard 
              name="Enterprise" 
              price="Custom"
              description="Customized solutions with API access and premium support for large organizations."
              features={[
                "Everything in Professional",
                "Access to Intent Data",
                "Custom data enrichment options",
                "Unlimited exports",
                "Advanced API access",
                "Dedicated account manager",
                "Custom integration support",
                "24/7 priority support"
              ]}
              buttonText="Contact Sales"
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
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                How does the 7-day free trial work?
              </h3>
              <p className="text-gray-600">
                Our 7-day free trial gives you access to limited features of our platform. No credit card is required to start, and you can upgrade to a paid plan at any time.
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
                We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also offer invoice payments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-sportbnk-navy mb-2">
                Do you offer discounts for non-profits or educational institutions?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for non-profits and educational institutions. Please contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Not sure which plan is right for you?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is here to help you find the perfect solution for your business needs.
            </p>
            <Button 
              className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/book-demo">Book A Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
