import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Marketing = () => {
  return (
    <PageLayout 
      pageTitle="Marketing Case Studies"
      metaDescription="Learn how sports brands and organizations use SportsBnk to create targeted marketing campaigns and improve audience engagement."
      metaKeywords="sports marketing, marketing case studies, targeted campaigns, audience engagement, sports brand marketing, customer segmentation"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Target className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Marketing Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Discover how sports organizations use SportsBnk to create compelling marketing campaigns that resonate with their target audience and drive engagement.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Improve campaign targeting by 60%</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Increase audience engagement rates</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Better ROI on marketing spend</p>
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
                src="/lovable-uploads/b727ac17-df3d-4270-a031-139c82129d27.png" 
                alt="Marketing case studies" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Marketing;