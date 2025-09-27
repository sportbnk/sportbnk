import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Marketing = () => {
  return (
    <PageLayout 
      pageTitle="How to Market with Sportbnk"
      metaDescription="Learn how to use Sportbnk for targeted marketing campaigns in the sports industry with smart segmentation, timing, and data-driven content strategies."
      metaKeywords="sports marketing, targeted campaigns, audience segmentation, marketing automation, sports industry marketing"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Target className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                How to Market with Sportbnk
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Transform your marketing approach with precise targeting, smart timing, and data-driven insights that connect your brand with the right sports professionals at the perfect moment.
              </p>
              
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Get Started
                </Button>
              </WaitlistDialog>
            </div>
            <div>
              <img 
                src="/lovable-uploads/b727ac17-df3d-4270-a031-139c82129d27.png" 
                alt="Marketing with Sportbnk" 
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
                  Targeted Audience Segmentation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Use Sportbnk's filtering to define your exact audience — by sport, region, role, or organisation type — ensuring your campaigns reach the right people.
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
                  Smarter Campaign Timing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Leverage real-time signals (e.g. new funding, sponsorships, or expansions) to launch marketing campaigns when organisations are most receptive.
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
                  Data-Driven Content
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tailor messaging to reflect the specific needs and pain points of clubs and organisations, using Sportbnk insights to create more relevant campaigns.
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
                  Brand Visibility in Sport
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Position your company in front of verified sports professionals worldwide, reducing wasted impressions and increasing marketing ROI.
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
                  Integration with Existing Tools
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Export data into your marketing platforms (HubSpot, Salesforce, Mailchimp etc.) for seamless execution and tracking.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Marketing;