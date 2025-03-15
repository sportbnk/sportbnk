
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const Recruit = () => {
  return (
    <PageLayout 
      pageTitle="Recruit Sports Industry Talent"
      metaDescription="Find top talent in the sports industry with SportsBnk Recruit. Our specialized hiring platform connects sports organizations with qualified candidates who understand your industry needs."
      metaKeywords="sports recruiting platform, sports industry hiring, sports talent acquisition, sports job board, hire sports professionals, sports careers, sports recruitment solution"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Users className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Find Top Talent in Sports
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A streamlined hiring platform specifically designed for organizations in the sports industry, helping you connect with qualified candidates who understand your unique industry needs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Industry-specific talent pool</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Direct communication with candidates</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Transparent hiring process</p>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" asChild>
                <Link to="/free-trial">Start Recruiting</Link>
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
                alt="Recruit product" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Find The Perfect Fit
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Sport-Specific Roles
              </h3>
              <p className="text-gray-600">
                From coaches and analysts to marketing specialists with sports expertise.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Pre-Screened Candidates
              </h3>
              <p className="text-gray-600">
                All candidates are verified and pre-screened for industry experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Seamless Hiring Process
              </h3>
              <p className="text-gray-600">
                Intuitive tools for interviewing, assessment, and onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Recruit;
