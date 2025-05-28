
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Check } from "lucide-react";

const PartnerProgram = () => {
  return (
    <PageLayout pageTitle="Partner Program">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Shield className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Partner with Sportsbnk
            </h2>
            <p className="text-lg text-gray-600">
              Join our partner network to expand your service offerings, unlock new revenue streams, 
              and deliver added value to your clients in the sports industry.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sportbnk-navy mb-6">
                Interested in Partnering?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                If you're keen on partnering with us, email us at <a href="mailto:info@sportbnk.com" className="text-sportbnk-green font-semibold hover:underline">info@sportbnk.com</a> and we'll discuss opportunities.
              </p>
              
              <div className="space-y-4 mb-8 text-left">
                <h4 className="text-lg font-semibold text-sportbnk-navy text-center mb-4">Partnership Opportunities Include:</h4>
                <div className="flex items-start">
                  <Check className="text-sportbnk-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <p>Revenue sharing through referral programs</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-sportbnk-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <p>Co-marketing and joint promotional opportunities</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-sportbnk-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <p>API integration and technical collaboration</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-sportbnk-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <p>Access to sports industry data and insights</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-sportbnk-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <p>Dedicated partnership support and resources</p>
                </div>
              </div>
              
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white group" asChild>
                <a href="mailto:info@sportbnk.com">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PartnerProgram;
