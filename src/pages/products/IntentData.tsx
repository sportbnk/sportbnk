
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const IntentData = () => {
  return (
    <PageLayout pageTitle="Intent Data">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <BarChart3 className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Identify High-Value Prospects
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get actionable insights into sports organizations actively seeking products or services in your category, allowing you to prioritize outreach to those most likely to convert.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Identify organizations with active purchase intent</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Understand buyer behavior patterns</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Track industry trends and opportunities</p>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Explore Intent Data
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
                alt="Intent Data product" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            How We Track Intent
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Content Engagement
              </h3>
              <p className="text-gray-600">
                We track engagement with industry content across thousands of sources.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Search Patterns
              </h3>
              <p className="text-gray-600">
                We analyze search behaviors specific to your product category.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Event Participation
              </h3>
              <p className="text-gray-600">
                We monitor attendance and engagement at industry events.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Technology Adoption
              </h3>
              <p className="text-gray-600">
                We track technology stack changes indicating potential needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IntentData;
