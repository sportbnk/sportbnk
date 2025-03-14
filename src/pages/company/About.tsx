
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

const About = () => {
  return (
    <PageLayout pageTitle="About Us">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sportsbnk was founded in 2020 by a team of sports industry veterans and data scientists who recognized a significant gap in the market: while various sales intelligence platforms existed for general B2B sales, none were specifically tailored to the unique needs and challenges of the sports industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a specialized database has evolved into a comprehensive suite of tools designed to help businesses connect, engage, and grow within the sports ecosystem.
              </p>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Meet Our Team
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
                alt="About Sportsbnk" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Our Mission
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Building className="h-8 w-8 text-sportbnk-green" />
            </div>
            <p className="text-xl text-gray-600 italic">
              "To empower businesses in the sports industry by providing them with precise, actionable, 
              and compliant data solutions that foster meaningful connections and drive sustainable 
              growth through intelligent sales, marketing, and hiring strategies."
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Why Sportsbnk?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlike broader sales intelligence platforms, we're dedicated exclusively to the sports sector, 
              providing solutions tailored to your industry-specific challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Sports-Focused</h3>
              <p className="text-gray-600">
                Every feature and data point is designed specifically for the sports industry's unique needs.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Quality Over Quantity</h3>
              <p className="text-gray-600">
                We prioritize data accuracy and relevance over simply providing massive databases of mixed-quality leads.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Compliance First</h3>
              <p className="text-gray-600">
                All our data is collected and maintained in full compliance with global privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
