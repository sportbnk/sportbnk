
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCard = ({ 
  features,
  buttonText = "Get Started",
  buttonLink = "/book-demo"
}: { 
  features: string[];
  buttonText?: string;
  buttonLink?: string;
}) => (
  <Card className="border border-sportbnk-green shadow-lg max-w-md mx-auto">
    <CardHeader className="pb-4 text-center">
      <CardTitle className="text-2xl font-bold text-sportbnk-navy">Standard Plan</CardTitle>
      <div className="mt-4">
        <span className="text-4xl font-bold text-sportbnk-navy">$49</span>
        <span className="text-gray-500 ml-2">/ month</span>
      </div>
      <p className="text-gray-600 mt-4">All the features you need to grow your business in the sports industry</p>
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
        className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white"
        asChild
      >
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  const features = [
    "Access to Discover tool with all filters",
    "Access to Boost for data enrichment",
    "Unlimited searches",
    "Export up to 1,000 contacts per month",
    "CRM integration (HubSpot, Salesforce)",
    "Email and chat support",
    "7-day free trial",
    "Cancel anytime"
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
              Just one plan with everything you need at a flat rate of $49/month.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <PricingCard 
              features={features}
              buttonText="Start 7-Day Free Trial"
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
                We keep it simple with just one monthly plan at $49. Contact our sales team if you need custom options for your organization.
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
