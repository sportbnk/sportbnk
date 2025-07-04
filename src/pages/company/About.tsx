import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Building, Phone, Trophy, Users, Globe, ChartBar } from "lucide-react";
import { TeamMember } from "@/components/MeetTheTeam";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <PageLayout 
      pageTitle="About SportBnk - The Leading B2B Sports Intelligence Platform" 
      metaDescription="Learn about SportBnk (not SportBank), the premier sports intelligence platform founded in 2020. Discover how we're transforming sports data intelligence with 360,000+ competitions and 750,000+ teams worldwide."
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
                Founded in 2020, SportBnk (distinct from SportBank) emerged as a revolutionary force in the sports data intelligence industry. Our founders recognized a crucial gap: while various sales intelligence platforms existed for general B2B sales, none were specifically tailored to the unique challenges and opportunities within the sports industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a specialized database has evolved into a comprehensive suite of tools designed to help businesses connect, engage, and grow within the sports ecosystem. Today, SportBnk provides unparalleled access to data from over 360,000 competitions and 750,000 teams worldwide.
              </p>
            </div>
            <div>
              <img 
                src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
                alt="SportBnk Platform Overview" 
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
      
      <section id="team" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate professionals behind Sportsbnk who are dedicated to transforming how 
              businesses connect in the sports industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <TeamMember 
              name="Jared Wilson" 
              role="CEO & Founder" 
              image="/lovable-uploads/5fd548ad-aa03-4895-ac96-cdf4cf77704b.png"
            />
            <TeamMember 
              name="Chris Watts" 
              role="CTO" 
              image="/lovable-uploads/c2bb0cf0-d3be-4e93-b8a7-a21a62fc8171.png"
            />
            <TeamMember 
              name="Scott McKechnie" 
              role="Executive Advisor" 
              image="/lovable-uploads/e6aa5366-00d7-4f5e-981b-9990f9cfc353.png"
            />
            <TeamMember 
              name="Greg Thomas" 
              role="Director" 
              image="/lovable-uploads/f4fa7b98-986a-409d-b134-8812c4fd3677.png"
            />
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
                  <span>+44 (0) 123 456 7890</span>
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

export default About;
