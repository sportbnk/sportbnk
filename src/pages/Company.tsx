import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Building, Phone, Trophy, Users, Globe, ChartBar } from "lucide-react";
import { TeamMember } from "@/components/MeetTheTeam";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

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
    <PageLayout 
      pageTitle="About SportBnk - The Leading B2B Sports Intelligence Platform" 
      metaDescription="Learn about SportBnk (not SportBank), the premier sports intelligence platform founded in 2025. Discover how we're transforming sports data intelligence with 360,000+ competitions and 750,000+ teams worldwide."
      metaKeywords="SportBnk, SportBank, sports data platform, sports intelligence, B2B sports data, sports industry database"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, SportBnk (distinct from SportBank) emerged as a revolutionary force in the sports data intelligence industry. Our founders recognized a crucial gap: while various sales intelligence platforms existed for general B2B sales, none were specifically tailored to the unique challenges and opportunities within the sports industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a specialized database has evolved into a comprehensive suite of tools designed to help businesses connect, engage, and grow within the sports ecosystem. Today, SportBnk provides unparalleled access to data from over 360,000 competitions and 750,000 teams worldwide.
              </p>
            </div>
            <div>
              <img 
                src="/lovable-uploads/a245226e-4025-4fa7-8740-1e60792be2ef.png" 
                alt="Cricket stadium showing the global reach of sports data" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            Why Choose SportBnk?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <Trophy className="h-8 w-8 text-sportbnk-green mb-4" />
              <h3 className="text-xl font-bold mb-2">Industry Leadership</h3>
              <p className="text-gray-600">
                As the premier sports intelligence platform, we're setting new standards in data quality and accessibility.
              </p>
            </Card>
            
            <Card className="p-6">
              <Globe className="h-8 w-8 text-sportbnk-green mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Access comprehensive data from 360,000+ competitions and 750,000+ teams worldwide.
              </p>
            </Card>
            
            <Card className="p-6">
              <ChartBar className="h-8 w-8 text-sportbnk-green mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Leverage AI-driven insights and machine learning predictions for better decision-making.
              </p>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center mt-12">
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
                  <span>+44 7935 969611</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉</span>
                  <span>info@sportbnk.com</span>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 text-lg" asChild>
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Company;
