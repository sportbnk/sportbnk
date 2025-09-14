
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Video, FileText, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ResourceCard = ({ 
  title, 
  description, 
  image, 
  category,
  icon,
  link
}: { 
  title: string; 
  description: string; 
  image: string;
  category: string;
  icon: React.ReactNode;
  link: string;
}) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-gray-200">
    <div className="aspect-video w-full overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 text-sportbnk-green mb-2">
        {icon}
        <span className="text-sm font-medium">{category}</span>
      </div>
      <CardTitle className="text-xl font-bold text-sportbnk-navy">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
    <CardFooter>
      <Link to={link} className="w-full">
        <Button variant="outline" className="w-full border-sportbnk-green text-sportbnk-green hover:bg-sportbnk-green hover:text-white">
          Read More
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const ResourceSection = ({
  title,
  description,
  children,
  id
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section className="py-16" id={id}>
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
      </div>
      {children}
    </div>
  </section>
);

const Resources = () => {
  return (
    <PageLayout pageTitle="Resources">
      <ResourceSection
        title="SportsBnk for Startups"
        description="Special resources and programs designed to help startups in the sports industry leverage data for rapid growth."
        id="sportbnk-startups"
      >
        <div className="bg-sportbnk-lightGrey rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Launch Your Sports Startup with Powerful Data</h3>
              <p className="text-gray-600 mb-6">
                Our startup program provides emerging sports businesses with affordable access to premium data intelligence tools,
                helping you make informed decisions from day one.
              </p>
              <Link to="/resources/startups">
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Join Startup Program
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
                alt="Startup resources" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </ResourceSection>
      
      <ResourceSection
        title="Community"
        description="Join our community of sports industry professionals to network, share insights, and stay updated on the latest trends."
        id="community"
      >
        <div className="bg-sportbnk-lightGrey rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Connect with Sports Professionals</h3>
              <p className="text-gray-600 mb-6">
                Join our WhatsApp community to network with industry peers, share insights, and stay updated on the latest trends in sports data intelligence.
              </p>
              <Link to="/resources/community">
                <Button className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white">
                  <Users className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/b90959b3-c7b5-4727-814a-cf86cd3204a1.png" 
                alt="Community networking" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </ResourceSection>
      
      <ResourceSection
        title="Help Center"
        description="Get the support you need with our comprehensive help resources and frequently asked questions."
        id="help-center"
      >
        <div className="bg-sportbnk-lightGrey rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Get Support When You Need It</h3>
              <p className="text-gray-600 mb-6">
                Find answers to common questions, access documentation, and get help with our platform features. Our support team is here to help you succeed.
              </p>
              <Link to="/resources/help-center">
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Visit Help Center
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/f5c8dc20-3de5-497c-bb2a-f7b149472312.png" 
                alt="Help and support" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </ResourceSection>
    </PageLayout>
  );
};

export default Resources;
