
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCard = ({ 
  title,
  price,
  period = "/ month",
  description,
  features,
  buttonText = "Get Started",
  buttonLink = "/book-demo",
  highlighted = false
}: { 
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText?: string;
  buttonLink?: string;
  highlighted?: boolean;
}) => (
  <Card className={`border ${highlighted ? 'border-sportbnk-green border-2' : 'border-gray-200'} shadow-lg max-w-md mx-auto`}>
    {highlighted && (
      <div className="bg-sportbnk-green text-white text-center py-1 text-sm font-medium">
        Most Popular
      </div>
    )}
    <CardHeader className="pb-4 text-center">
      <CardTitle className="text-2xl font-bold text-sportbnk-navy">{title}</CardTitle>
      <div className="mt-4">
        <span className="text-4xl font-bold text-sportbnk-navy">{price}</span>
        <span className="text-gray-500 ml-2">{period}</span>
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
      <Button 
        className={`w-full ${highlighted ? 'bg-sportbnk-green hover:bg-sportbnk-green/90' : 'bg-sportbnk-navy hover:bg-sportbnk-navy/90'} text-white`}
        asChild
      >
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  const standardFeatures = [
    "Access to Discover tool with all filters",
    "Access to Boost for data enrichment",
    "Unlimited searches",
    "Export up to 1,000 contacts per month",
    "CRM integration (HubSpot, Salesforce)",
    "Email and chat support",
    "7-day free trial",
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
  
  return (
    <PageLayout pageTitle="Pricing">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="Standard Plan"
              price="$49"
              description="All the features you need to grow your business in the sports industry"
              features={standardFeatures}
              buttonText="Start 7-Day Free Trial"
            />
            
            <PricingCard 
              title="Pro Plan"
              price="$99"
              description="Enhanced features and support for growing teams and enterprises"
              features={proFeatures}
              buttonText="Start 7-Day Free Trial"
              highlighted={true}
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
