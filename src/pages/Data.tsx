
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Shield, Database, CheckCircle, Globe, Users } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const DataFeature = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-start">
    <div className="bg-sportbnk-green/10 p-3 rounded-full">
      <div className="text-sportbnk-green">{icon}</div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Data = () => {
  return (
    <PageLayout 
      pageTitle="The Most Comprehensive Sports Industry Data"
      metaDescription="Access the most comprehensive sports industry data with Sportbnk. Precise, actionable, and compliant data solutions that connect organisations with the right people at the right time."
      metaKeywords="sports industry data, sports database, verified sports data, GDPR compliant, sports organizations, sports professionals, data collection, sports intelligence"
    >
      <section className="py-16 md:py-24 pt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-6 text-center">
              The Most Comprehensive Sports Industry Data
            </h2>
            <p className="text-lg text-gray-600 text-center">
              At Sportbnk, we empower businesses in sport by delivering precise, actionable, and compliant data solutions. Our mission is to connect organisations with the right people, at the right time, through high-quality intelligence that drives growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <DataFeature 
              icon={<Database size={24} />}
              title="Data Collection"
              description="We gather intelligence from a wide range of sources, including public websites, official documents, social media channels, and direct partnerships with leading data providers. This blended approach ensures the most accurate and up-to-date view of the sports industry."
            />
            
            <DataFeature 
              icon={<CheckCircle size={24} />}
              title="Data Verification"
              description="Every dataset undergoes rigorous verification. Our system combines automated checks with manual reviews to maintain accuracy, completeness, and consistency. This ensures the information you use is reliable and ready for immediate action."
            />
            
            <DataFeature 
              icon={<Shield size={24} />}
              title="Compliance & Privacy"
              description="All Sportbnk data is sourced ethically and adheres to strict global compliance standards, including GDPR and CCPA. We make it simple to conduct outreach with confidence, knowing your data is compliant and secure."
            />
            
            <DataFeature 
              icon={<Globe size={24} />}
              title="Coverage & Reach"
              description="Our growing database spans thousands of sports organisations, from professional clubs to grassroots academies. We map the full ecosystem — teams, competitions, and the professionals behind them — giving you unparalleled visibility into the sports industry."
            />
            
            <DataFeature 
              icon={<Users size={24} />}
              title="Partnerships"
              description="Through strategic collaborations with trusted data providers, we strengthen the depth and breadth of our intelligence. These partnerships ensure Sportbnk users always have access to the most relevant, verified, and enriched data available."
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to harness the power of sports data?</h2>
            <p className="text-lg mb-8 opacity-90">
              Access the most comprehensive sports industry database and start driving meaningful connections that fuel business growth.
            </p>
            <WaitlistDialog>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg">
                Join Waitlist
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Data;
