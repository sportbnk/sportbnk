import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { UserCheck, Building, Handshake, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MeetTheTeam from "@/components/MeetTheTeam";

const CompanySection = ({ 
  title, 
  description, 
  image,
  reverse = false
}: { 
  title: string; 
  description: string; 
  image: string;
  reverse?: boolean;
}) => (
  <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className={reverse ? 'order-1 md:order-2' : ''}>
      <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">{title}</h2>
      <p className="text-lg text-gray-600 mb-6">{description}</p>
    </div>
    <div className={reverse ? 'order-2 md:order-1' : ''}>
      <img 
        src={image} 
        alt={title}
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
  </div>
);

const CompanyValueCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="mb-4 bg-sportbnk-green/10 w-12 h-12 rounded-full flex items-center justify-center">
      <div className="text-sportbnk-green">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Company = () => {
  return (
    <PageLayout pageTitle="Our Company">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <CompanySection 
            title="About Sportsbnk"
            description="Sportsbnk is an innovative B2B sales intelligence platform specifically tailored to the sports industry. Our platform harnesses the power of data analytics to provide businesses with highly accurate and compliant contact information, empowering them to effectively reach out to sports organisations, professionals, and stakeholders. With a data-driven approach and industry-specific insights, we aim to be the go-to platform for organisations in the sports space looking to enhance their business development, recruitment, and marketing efforts."
            image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png"
          />
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">Our Mission & Values</h2>
          
          <div className="mb-12 p-8 bg-white rounded-lg shadow-sm text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Our Mission</h3>
            <p className="text-lg text-gray-600 italic">
              "To empower businesses in the sports industry by providing them with precise, actionable, 
              and compliant data solutions that foster meaningful connections and drive sustainable 
              growth through intelligent sales, marketing, and hiring strategies."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CompanyValueCard 
              icon={<Building size={24} />}
              title="Industry Focus"
              description="We are dedicated exclusively to the sports sector, allowing us to build a deep understanding of your unique needs."
            />
            
            <CompanyValueCard 
              icon={<UserCheck size={24} />}
              title="Data Accuracy"
              description="We maintain the highest levels of data accuracy to ensure you connect with the right decision-makers."
            />
            
            <CompanyValueCard 
              icon={<Handshake size={24} />}
              title="Partnership Approach"
              description="We see ourselves as partners in your success, not just another service provider."
            />
          </div>
        </div>
      </section>
      
      <MeetTheTeam />
      
      <section className="py-16 bg-sportbnk-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="text-lg opacity-90 mb-6">
                  Have questions or want to learn more about how Sportsbnk can help your business?
                </p>
                <div className="flex items-center mb-2">
                  <Phone size={18} className="mr-2" />
                  <span>+44 (0) 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉</span>
                  <span>info@sportbnk.com</span>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Company;
