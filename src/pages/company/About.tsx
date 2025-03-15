
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
              name="Alex Johnson" 
              role="CEO & Founder" 
              image="/lovable-uploads/5a649dfb-5709-4042-bda2-aec41e85a32d.png"
            />
            <TeamMember 
              name="Sarah Williams" 
              role="CTO" 
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png"
            />
            <TeamMember 
              name="David Chen" 
              role="Head of Data" 
              image="/lovable-uploads/b727ac17-df3d-4270-a031-139c82129d27.png"
            />
            <TeamMember 
              name="Emma Roberts" 
              role="Chief Marketing Officer" 
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png"
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
                  <phone size={18} className="mr-2" />
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

export default About;
