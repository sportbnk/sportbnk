
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Check, ArrowRight } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Startups = () => {
  return (
    <PageLayout pageTitle="SportBnk for Startups">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Rocket className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Launch Your Sports Startup with Powerful Data
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our startup program provides emerging sports businesses with affordable access to premium 
                data intelligence tools, helping you make informed decisions from day one.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2"><Check /></span>
                  <p>50% discount for eligible startups for first 6 months</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2"><Check /></span>
                  <p>Full access to all SportBnk tools and features</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2"><Check /></span>
                  <p>Dedicated support from our startup success team</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2"><Check /></span>
                  <p>Access to our network of sports industry investors and mentors</p>
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
                src="/lovable-uploads/95851a5c-d2cb-4a03-9b29-9c36f64114f0.png" 
                alt="Baseball player in action demonstrating athletic excellence and startup determination" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Eligibility Requirements
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Less than 2 years in operation</h3>
                  <p className="text-gray-600">Your company must have been founded within the last two years.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Sports industry focus</h3>
                  <p className="text-gray-600">Your primary business focus must be within the sports industry.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Not previously enrolled</h3>
                  <p className="text-gray-600">Your startup has not previously participated in the SportBnk startup program.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <WaitlistDialog>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white group">
                Join Waitlist <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Startups;
