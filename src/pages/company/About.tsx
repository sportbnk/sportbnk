import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Building, Phone, Trophy, Users, Globe, ChartBar, Shield, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <PageLayout 
      pageTitle="About Sportbnk - The Leading Sports Intelligence Platform" 
      metaDescription="Learn about Sportbnk, the premier sports intelligence platform founded in 2025. Discover how we're transforming sports data intelligence with real-time signals and actionable insights."
      metaKeywords="Sportbnk, sports intelligence, sports data platform, B2B sports data, sports industry database, sports signals"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-12 text-center">
              About Sportbnk
            </h1>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-sportbnk-navy mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Founded in 2025, Sportbnk was created to solve a problem no one else was tackling: the lack of a dedicated intelligence platform built specifically for the sports industry. While traditional B2B sales intelligence tools existed, they failed to capture the unique dynamics of sport — from sponsorship deals and funding rounds to player signings and organisational changes.
                </p>
                <p>
                  What started as a focused database has grown into a comprehensive platform that delivers real-time signals, enriched contacts, and actionable insights. Today, Sportbnk helps businesses sell, market, and hire smarter within the global sports ecosystem.
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-sportbnk-navy mb-8">
                Why Choose Sportbnk?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <Trophy className="h-8 w-8 text-sportbnk-green mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-sportbnk-navy">Industry Expertise</h3>
                  <p className="text-gray-600">
                    We understand sport. Sportbnk is built for the unique commercial, operational, and cultural landscape of the sports industry.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Target className="h-8 w-8 text-sportbnk-green mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-sportbnk-navy">Actionable Intelligence</h3>
                  <p className="text-gray-600">
                    Go beyond raw data with verified signals that show who's buying, hiring, or partnering — and when.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <Shield className="h-8 w-8 text-sportbnk-green mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-sportbnk-navy">Trusted & Compliant</h3>
                  <p className="text-gray-600">
                    Our intelligence is sourced ethically, verified for accuracy, and compliant with global standards like GDPR and CCPA.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <ChartBar className="h-8 w-8 text-sportbnk-green mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-sportbnk-navy">Scalable Growth</h3>
                  <p className="text-gray-600">
                    From grassroots to elite organisations, Sportbnk empowers businesses to connect with the right opportunities and grow with confidence.
                  </p>
                </Card>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-6">
                <Building className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 italic max-w-3xl mx-auto">
                "To empower businesses in the sports industry by providing precise, actionable, and compliant intelligence that fosters meaningful connections and drives sustainable growth through smarter sales, marketing, and hiring strategies."
              </p>
            </div>
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
                  Have questions or want to learn more about how Sportbnk can help your business?
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

export default About;