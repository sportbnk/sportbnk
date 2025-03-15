
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Boost = () => {
  return (
    <PageLayout 
      pageTitle="Boost Sports Data"
      metaDescription="Enhance your existing customer databases with SportsBnk Boost. Update outdated information and fill gaps in your sports contact data for improved outreach success."
      metaKeywords="enhance sports data, update sports contacts, sports data enrichment, complete customer profiles, sports database enhancement, data appending service, sports industry database"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Rocket className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Enhance Your Existing Data
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Boost your existing customer databases by appending missing or outdated information, ensuring you have the most complete and accurate profiles of your sports industry contacts.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Fill gaps in your existing data</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Update outdated contact information</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Enhance records with sports-specific details</p>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" asChild>
                <Link to="/free-trial">Try Boost Now</Link>
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
                alt="Boost product" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Key Benefits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Higher Conversion Rates
              </h3>
              <p className="text-gray-600">
                Improve your outreach success with more accurate and complete contact information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Better Segmentation
              </h3>
              <p className="text-gray-600">
                Segment your database more effectively with enhanced profile data.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Reduced Bounce Rates
              </h3>
              <p className="text-gray-600">
                Minimize email bounces and failed outreach attempts with verified contact details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Boost;
