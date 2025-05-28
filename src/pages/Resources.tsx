
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
        <div className="text-center mb-8">
          <Link to="/resources/community">
            <Button className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white px-8">
              <Users className="mr-2 h-4 w-4" />
              Join Our Community
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 border-0 shadow-sm p-6">
            <div className="text-sportbnk-green mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Member Networking</h3>
            <p className="text-gray-600">
              Connect with industry peers, share experiences, and build meaningful professional relationships.
            </p>
          </Card>
          
          <Card className="bg-white/80 border-0 shadow-sm p-6">
            <div className="text-sportbnk-green mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Exclusive Resources</h3>
            <p className="text-gray-600">
              Access members-only content, guides, and tools designed specifically for the sports industry.
            </p>
          </Card>
          
          <Card className="bg-white/80 border-0 shadow-sm p-6">
            <div className="text-sportbnk-green mb-4">
              <Star size={24} />
            </div>
            <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Special Events</h3>
            <p className="text-gray-600">
              Participate in webinars, workshops, and networking events tailored to sports professionals.
            </p>
          </Card>
        </div>
      </ResourceSection>
      
      <section className="py-16 bg-sportbnk-lightGrey" id="latest-resources">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">Latest Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard 
              title="How Data Intelligence is Transforming Sports Marketing"
              description="Learn how leading sports organizations are leveraging data to enhance their marketing strategies."
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png"
              category="Article"
              icon={<FileText size={16} />}
              link="/resources/articles"
            />
            
            <ResourceCard 
              title="Finding the Right Sports Talent: Data-Driven Recruitment"
              description="Discover how data intelligence can streamline your recruitment process in the sports industry."
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png"
              category="Webinar"
              icon={<Video size={16} />}
              link="/resources/webinars"
            />
            
            <ResourceCard 
              title="Building Community in Sports Organizations"
              description="Learn how to foster strong communities within sports organizations and engage with your audience effectively."
              image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png"
              category="Article"
              icon={<FileText size={16} />}
              link="/resources/articles"
            />
          </div>
          
          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/resources/articles">
                <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                  Articles
                </Button>
              </Link>
              <Link to="/resources/webinars">
                <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                  Webinars
                </Button>
              </Link>
              <Link to="/resources/case-studies">
                <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                  Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16" id="help-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">Help Center</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get quick answers to your questions and learn how to make the most of the Sportsbnk platform.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="p-4 border-b">
                <h3 className="font-medium text-sportbnk-navy">How do I export contacts to my CRM?</h3>
              </div>
              <div className="p-4 border-b">
                <h3 className="font-medium text-sportbnk-navy">What data fields are available in the Discover tool?</h3>
              </div>
              <div className="p-4 border-b">
                <h3 className="font-medium text-sportbnk-navy">How often is the data updated?</h3>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sportbnk-navy">Is the platform GDPR compliant?</h3>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/resources/help-center">
                <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Resources;
