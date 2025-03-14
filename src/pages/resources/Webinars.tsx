
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Video, Clock, Calendar, ArrowRight } from "lucide-react";

const WebinarCard = ({ 
  title, 
  description, 
  date, 
  duration, 
  image, 
  speakers,
  isUpcoming = false
}: { 
  title: string; 
  description: string; 
  date: string; 
  duration: string; 
  image: string; 
  speakers: {name: string, role: string}[];
  isUpcoming?: boolean;
}) => (
  <Card className="overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg">
    <div className="aspect-video w-full overflow-hidden relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      {isUpcoming && (
        <div className="absolute top-3 right-3 bg-sportbnk-green text-white text-sm px-3 py-1 rounded-full">
          Upcoming
        </div>
      )}
      {!isUpcoming && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-sportbnk-green flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-white ml-1"></div>
          </div>
        </div>
      )}
    </div>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" /> {date}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" /> {duration}
        </div>
      </div>
      <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-sportbnk-navy">Speakers:</p>
        {speakers.map((speaker, index) => (
          <div key={index} className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
            <div>
              <p className="text-sm font-medium">{speaker.name}</p>
              <p className="text-xs text-gray-500">{speaker.role}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button className={`w-full ${isUpcoming ? 'bg-sportbnk-green hover:bg-sportbnk-green/90 text-white' : 'bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white'}`}>
        {isUpcoming ? 'Register Now' : 'Watch Recording'}
      </Button>
    </CardFooter>
  </Card>
);

const Webinars = () => {
  return (
    <PageLayout pageTitle="Webinars">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Video className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Educational Webinars
            </h2>
            <p className="text-lg text-gray-600">
              Learn from industry experts through our series of webinars covering the latest trends, 
              strategies, and innovations in sports data intelligence.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-8">
              Upcoming Webinars
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <WebinarCard 
                title="Leveraging Intent Data in Sports Marketing" 
                description="Discover how to use intent signals to identify and prioritize high-value prospects."
                date="July 15, 2023" 
                duration="60 min" 
                image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png"
                speakers={[
                  {name: "Sarah Johnson", role: "Head of Marketing, Sportsbnk"},
                  {name: "Michael Chen", role: "Sports Marketing Consultant"}
                ]}
                isUpcoming={true}
              />
              
              <WebinarCard 
                title="Building Data-Driven Sports Organizations" 
                description="Learn how to transform your sports business into a data-first operation."
                date="July 22, 2023" 
                duration="75 min" 
                image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png"
                speakers={[
                  {name: "Alex Thompson", role: "Data Science Director, Sportsbnk"},
                  {name: "Emma Roberts", role: "CTO, Athletic Intelligence"}
                ]}
                isUpcoming={true}
              />
              
              <WebinarCard 
                title="The Future of Fan Engagement" 
                description="Explore innovative strategies for enhancing fan experiences through data."
                date="August 5, 2023" 
                duration="60 min" 
                image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png"
                speakers={[
                  {name: "David Williams", role: "Fan Experience Lead, Sportsbnk"},
                  {name: "Lisa Patel", role: "CEO, FanEngage"}
                ]}
                isUpcoming={true}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-8">
              Past Webinars
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <WebinarCard 
                title="Sports Data Compliance: GDPR and Beyond" 
                description="Essential knowledge for handling sports data in compliance with regulations."
                date="June 10, 2023" 
                duration="90 min" 
                image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png"
                speakers={[
                  {name: "Jennifer Lewis", role: "Legal Counsel, Sportsbnk"},
                  {name: "Robert Kwan", role: "Data Privacy Expert"}
                ]}
              />
              
              <WebinarCard 
                title="Finding the Right Sports Talent" 
                description="Data-driven strategies for recruiting in the competitive sports industry."
                date="May 28, 2023" 
                duration="60 min" 
                image="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png"
                speakers={[
                  {name: "Thomas Garcia", role: "Talent Acquisition, Sportsbnk"},
                  {name: "Olivia Brown", role: "HR Director, SportsTech"}
                ]}
              />
              
              <WebinarCard 
                title="Sports Sponsorship Intelligence" 
                description="Using data to identify and secure more effective sponsorship deals."
                date="May 12, 2023" 
                duration="75 min" 
                image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png"
                speakers={[
                  {name: "James Wilson", role: "Partnerships Lead, Sportsbnk"},
                  {name: "Rachel Chen", role: "Sponsorship Director, Global Sports"}
                ]}
              />
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                View All Past Webinars <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Webinars;
