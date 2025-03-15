
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Shield, Database, CheckCircle, Globe } from "lucide-react";

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
      pageTitle="Sports Industry Data"
      metaDescription="Access comprehensive sports industry data with SportsBnk. Our database includes 750,000+ teams and 360,000+ competitions worldwide with verified and GDPR compliant information."
      metaKeywords="sports industry data, sports database, sports teams database, sports competitions data, GDPR compliant sports data, sports data verification, global sports coverage"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-6 text-center">
              The Most Comprehensive Sports Industry Data
            </h2>
            <p className="text-lg text-gray-600 text-center">
              At Sportsbnk, we empower businesses in the sports industry by providing precise, 
              actionable, and compliant data solutions that foster meaningful connections and 
              drive sustainable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <DataFeature 
              icon={<Database size={24} />}
              title="Data Collection"
              description="We combine proprietary research with reputable third-party data providers to ensure high-quality data across the sports industry. Our comprehensive database includes over 750,000 sports teams and 360,000+ competitions worldwide."
            />
            
            <DataFeature 
              icon={<CheckCircle size={24} />}
              title="Data Verification"
              description="We implement regular checks to ensure accuracy and compliance with global standards. Every piece of information undergoes a thorough verification process before being added to our database."
            />
            
            <DataFeature 
              icon={<Shield size={24} />}
              title="Compliance & Privacy"
              description="All data provided through Sportsbnk is fully compliant with global standards, including GDPR and CCPA. This allows you to engage in outreach efforts with confidence, knowing that all data is ethically sourced."
            />
            
            <DataFeature 
              icon={<Globe size={24} />}
              title="Global Coverage"
              description="Our database spans across multiple countries and regions, giving you access to sports organizations, teams, and professionals worldwide. This global reach enables you to expand your business beyond geographical boundaries."
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to harness the power of sports data?</h2>
            <p className="text-lg mb-8 opacity-90">
              Start using the most comprehensive sports industry database to drive your business forward.
            </p>
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg">
              Book A Demo
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Data;
