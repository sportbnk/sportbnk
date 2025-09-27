import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Signals = () => {
  return (
    <PageLayout 
      pageTitle="SportBnk Signals"
      metaDescription="Stay ahead with SportBnk Signals - real-time insights and alerts about opportunities in the sports industry. Never miss important business signals again."
      metaKeywords="sports signals, real-time insights, sports opportunities, business alerts, sports industry intelligence, opportunity tracking"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Activity className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Real-time Sports Intelligence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get instant alerts about new opportunities, funding rounds, job openings, and strategic moves across the sports industry with SportBnk Signals.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Real-time opportunity alerts</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Customizable signal filters</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Industry trend monitoring</p>
                </div>
              </div>
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Join Waitlist
                </Button>
              </WaitlistDialog>
            </div>
            <div>
              <img 
                src="/lovable-uploads/e8123646-36ca-4bd8-8260-72d085d91503.png" 
                alt="SportBnk Signals product" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Signal Types
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Business Opportunities
              </h3>
              <p className="text-gray-600">
                Track new partnerships, sponsorship deals, and commercial opportunities in real-time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Personnel Changes
              </h3>
              <p className="text-gray-600">
                Stay updated on executive moves, new hires, and organizational changes across sports organizations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Financial Activity
              </h3>
              <p className="text-gray-600">
                Monitor funding rounds, acquisitions, and financial developments in the sports ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Signals;