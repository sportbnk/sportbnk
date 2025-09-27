import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Hiring = () => {
  return (
    <PageLayout 
      pageTitle="Hiring Case Studies"
      metaDescription="See how sports organizations use SportsBnk to streamline their hiring process and find the best talent in the sports industry."
      metaKeywords="sports hiring, recruitment case studies, talent acquisition, sports industry hiring, HR solutions, candidate sourcing"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Users className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Hiring Success Stories
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Learn how sports organizations use SportsBnk to identify, attract, and hire top talent across all areas of the sports industry.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Reduce time-to-hire by 50%</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Access to qualified candidate pool</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Better quality hires and retention</p>
                </div>
              </div>
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  View Case Studies
                </Button>
              </WaitlistDialog>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
                alt="Hiring case studies" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Hiring;