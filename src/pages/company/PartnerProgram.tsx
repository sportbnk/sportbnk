import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const PartnerTier = ({ 
  title, 
  description, 
  benefits, 
  featured = false 
}: { 
  title: string; 
  description: string; 
  benefits: string[];
  featured?: boolean;
}) => (
  <Card className={`border-gray-200 h-full transition-all duration-300 hover:shadow-lg ${featured ? 'border-sportbnk-green ring-1 ring-sportbnk-green' : ''}`}>
    <CardContent className="p-6">
      {featured && (
        <div className="bg-sportbnk-green text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
          Recommended
        </div>
      )}
      <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="space-y-3 mb-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <span className="text-sportbnk-green mr-2 mt-1"><Check size={16} /></span>
            <p className="text-sm">{benefit}</p>
          </div>
        ))}
      </div>
      
      <Button className={`w-full ${featured ? 'bg-sportbnk-green hover:bg-sportbnk-green/90 text-white' : 'bg-white border border-sportbnk-green text-sportbnk-green hover:bg-sportbnk-green hover:text-white'}`} asChild>
        <Link to="/contact">Apply Now</Link>
      </Button>
    </CardContent>
  </Card>
);

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
          
          <div className="grid md:grid-cols-3 gap-8">
            <PartnerTier 
              title="Referral Partner"
              description="Ideal for consultants and advisors who want to refer clients to Sportsbnk."
              benefits={[
                "Competitive commission structure",
                "Dedicated partner support",
                "Co-branded marketing materials",
                "Regular product updates",
                "Partner portal access"
              ]}
            />
            
            <PartnerTier 
              title="Solution Partner"
              description="Perfect for agencies and service providers who want to incorporate Sportsbnk into their offerings."
              benefits={[
                "Higher commission rates",
                "Joint marketing opportunities",
                "Advanced product training",
                "Early access to new features",
                "Partner certification program",
                "Dedicated account manager"
              ]}
              featured={true}
            />
            
            <PartnerTier 
              title="Technology Partner"
              description="For software companies looking to integrate with Sportsbnk's platform."
              benefits={[
                "API integration support",
                "Technical documentation",
                "Joint development opportunities",
                "Co-marketing initiatives",
                "Product roadmap input",
                "Partner ecosystem visibility"
              ]}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Partner Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="p-6">
                <p className="text-lg italic text-gray-600 mb-6">
                  "Partnering with Sportsbnk has allowed us to offer our sports industry clients access to high-quality data intelligence, significantly enhancing our service offerings and driving new business opportunities."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-sportbnk-navy">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">CEO, SportsTech Agency</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="p-6">
                <p className="text-lg italic text-gray-600 mb-6">
                  "The integration between our CRM platform and Sportsbnk has created a seamless experience for our mutual clients, resulting in higher user satisfaction and retention rates."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-sportbnk-navy">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Director of Partnerships, DataCRM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white group" asChild>
              <Link to="/contact">
                Apply to Become a Partner <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PartnerProgram;
