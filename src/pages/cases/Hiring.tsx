import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Hiring = () => {
  return (
    <PageLayout 
      pageTitle="How to Hire with Sportbnk"
      metaDescription="Discover how to use Sportbnk for sports industry recruitment, tracking talent movements, and building strong hiring pipelines with verified professionals."
      metaKeywords="sports hiring, talent recruitment, job tracking, sports industry hiring, candidate sourcing, recruitment pipeline"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Users className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                How to Hire with Sportbnk
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Revolutionize your recruitment strategy with real-time talent tracking, verified professional networks, and proactive pipeline building in the sports industry.
              </p>
              
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Get Started
                </Button>
              </WaitlistDialog>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
                alt="Hiring with Sportbnk" 
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
                  Track Job Movements
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Stay ahead of the curve with real-time job change signals, so you know when top talent is on the move.
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
                  Access Verified Professionals
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Leverage Sportbnk's database of employees within clubs and organisations to find candidates with the right background and expertise.
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
                  Build Talent Pipelines
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create targeted lists of potential candidates across specific sports, regions, or roles to support proactive recruitment strategies.
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
                  Reduce Hiring Costs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  By directly connecting with qualified professionals, you cut reliance on third-party recruiters and reduce time-to-hire.
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
                  Strengthen Employer Brand
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Engage with sports professionals through accurate outreach and relationship-building, positioning your organisation as an attractive place to work.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Hiring;