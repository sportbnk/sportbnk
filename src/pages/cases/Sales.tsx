import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Sales = () => {
  return (
    <PageLayout 
      pageTitle="Sales Case Studies"
      metaDescription="Discover how sports organizations use SportsBnk to boost their sales performance with targeted data insights and customer acquisition strategies."
      metaKeywords="sports sales, sales case studies, customer acquisition, sales performance, sports data sales, revenue growth"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <TrendingUp className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Sales Success Stories
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                See how sports organizations leverage SportsBnk data to drive sales growth, identify new opportunities, and convert prospects more effectively.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Increase conversion rates by 40%</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Identify high-value prospects faster</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Reduce sales cycle time</p>
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
                src="/lovable-uploads/95851a5c-d2cb-4a03-9b29-9c36f64114f0.png" 
                alt="Sales case studies" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sales;