import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Sales = () => {
  return (
    <PageLayout 
      pageTitle="How Sportbnk Drives Sales"
      metaDescription="Discover how Sportbnk helps sports suppliers identify buying signals, target decision-makers, and accelerate sales growth with real-time intelligence."
      metaKeywords="sports sales, buying signals, sales intelligence, prospect targeting, sports industry sales, revenue growth"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <TrendingUp className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                How Sportbnk Drives Sales
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Sportbnk transforms how suppliers connect with sports organizations by providing real-time intelligence, precise targeting, and streamlined workflows that drive faster sales cycles and sustainable growth.
              </p>
              
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Get Started
                </Button>
              </WaitlistDialog>
            </div>
            <div>
              <img 
                src="/lovable-uploads/95851a5c-d2cb-4a03-9b29-9c36f64114f0.png" 
                alt="Sales case studies" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Identify Buying Signals
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sportbnk monitors the sports ecosystem for real-time signals — from sponsorship announcements to procurement needs and job changes. These signals reveal when clubs, academies, and organisations are actively in the market for new solutions, allowing suppliers to target prospects at the right time.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Precision Targeting
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Through advanced filtering, suppliers can segment prospects by sport, geography, role, or organisational type. This ensures outreach is focused on qualified decision-makers, reducing wasted effort and increasing conversion rates.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Enriched Contact Data
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sportbnk provides verified and compliant contact information for key stakeholders, enabling sales teams to reach decision-makers directly without relying on guesswork or outdated databases.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Streamlined Workflows
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With list-building, CSV export, and CRM integrations, sales teams can plug Sportbnk data directly into their existing processes — ensuring intelligence translates into actionable pipeline opportunities without friction.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Shorter Sales Cycles
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  By combining timely signals with accurate contact data, suppliers can engage prospects at the moment of need. This reduces the lag between discovery and conversion, driving faster revenue growth.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sportbnk-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  6
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-3">
                  Scalable Growth
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  As teams expand, Sportbnk scales with them — providing continuous intelligence and new opportunities across sports, from grassroots to elite organisations, ensuring long-term sales growth.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sales;