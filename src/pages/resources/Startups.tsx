
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Check, ArrowRight } from "lucide-react";

const Startups = () => {
  return (
    <PageLayout pageTitle="SportsBnk for Startups">
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
                  <p>90% discount for eligible startups in their first year</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2"><Check /></span>
                  <p>Full access to all Sportsbnk tools and features</p>
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
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Apply to the Program
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
                alt="SportsBnk for Startups" 
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
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Less than 3 years in operation</h3>
                  <p className="text-gray-600">Your company must have been founded within the last three years.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Less than $1M in funding</h3>
                  <p className="text-gray-600">Your startup has raised less than $1 million in total funding.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Sports industry focus</h3>
                  <p className="text-gray-600">Your primary business focus must be within the sports industry.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 bg-sportbnk-green/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-sportbnk-green font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sportbnk-navy mb-1">Not previously enrolled</h3>
                  <p className="text-gray-600">Your startup has not previously participated in the Sportsbnk startup program.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how sports startups have accelerated their growth with Sportsbnk.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="SportsTech Logo" 
                    className="h-12 w-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">SportsTech</h3>
                <p className="text-gray-600 mb-4">
                  "Sportsbnk's data intelligence platform helped us identify and connect with our ideal customers from day one, accelerating our go-to-market strategy by months."
                </p>
                <p className="text-sm text-gray-500">
                  – Alex Chen, Founder & CEO
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="AthleteAI Logo" 
                    className="h-12 w-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">AthleteAI</h3>
                <p className="text-gray-600 mb-4">
                  "As a small team with limited resources, Sportsbnk's startup program gave us access to enterprise-level data tools that would have otherwise been out of reach."
                </p>
                <p className="text-sm text-gray-500">
                  – Sarah Johnson, Co-Founder
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="FanEngage Logo" 
                    className="h-12 w-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">FanEngage</h3>
                <p className="text-gray-600 mb-4">
                  "The connections we made through Sportsbnk's network led to our first major client and eventually our seed funding round."
                </p>
                <p className="text-sm text-gray-500">
                  – Mike Roberts, Founder
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white group">
              Apply to the Program <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Startups;
