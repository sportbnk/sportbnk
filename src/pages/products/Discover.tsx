
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <PageLayout 
      pageTitle="Discover Sports Contacts"
      metaDescription="Build targeted lists of sports organizations, teams and professionals with SportsBnk Discover. Find the right decision-makers quickly with our powerful sports database."
      metaKeywords="sports contacts database, find sports decision makers, sports organizations list, sports contact search, sport industry contacts, sports data discovery, sports professional database"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Search className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Find the Right Sports Contacts
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Build highly targeted lists of sports organizations, teams, and professionals with powerful filtering options that allow you to identify the right decision-makers quickly and effectively.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Powerful filtering tools tailored to the sports industry</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>High-quality, verified contact information</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Easily exportable lists in multiple formats</p>
                </div>
              </div>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" asChild>
                <Link to="/free-trial">Try Discover Now</Link>
              </Button>
            </div>
            <div>
              <img 
                src="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png" 
                alt="Discover product" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            How Discover Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-sportbnk-green font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Define Your Criteria
              </h3>
              <p className="text-gray-600">
                Use our specialized filters to pinpoint exactly the right sports organizations and professionals you need to connect with.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-sportbnk-green font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Access Verified Data
              </h3>
              <p className="text-gray-600">
                Browse through a comprehensive database of sports contacts with up-to-date, verified information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-sportbnk-green font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                Export & Connect
              </h3>
              <p className="text-gray-600">
                Export your targeted lists to your CRM or reach out directly through our platform to start building meaningful relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Discover;
