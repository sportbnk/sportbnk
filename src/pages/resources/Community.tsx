
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, MapPin, ArrowRight } from "lucide-react";

const EventCard = ({ 
  title, 
  description, 
  date, 
  location, 
  type
}: { 
  title: string; 
  description: string; 
  date: string; 
  location: string;
  type: 'in-person' | 'virtual';
}) => (
  <Card className="border-gray-200 transition-all duration-300 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${type === 'in-person' ? 'bg-sportbnk-navy/10 text-sportbnk-navy' : 'bg-sportbnk-green/10 text-sportbnk-green'}`}>
          {type === 'in-person' ? 'In-Person' : 'Virtual'}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" /> {date}
        </div>
      </div>
      <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin className="h-4 w-4 mr-1" /> {location}
      </div>
      <Button className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
        Register Now
      </Button>
    </CardContent>
  </Card>
);

const MemberCard = ({ 
  name, 
  role, 
  company,
  image = "/placeholder.svg" 
}: { 
  name: string; 
  role: string;
  company: string;
  image?: string;
}) => (
  <div className="text-center">
    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="font-bold text-sportbnk-navy">{name}</h3>
    <p className="text-sm text-gray-600">{role}</p>
    <p className="text-sm text-gray-500">{company}</p>
  </div>
);

const Community = () => {
  return (
    <PageLayout pageTitle="Community">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Users className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Join Our Sports Data Community
            </h2>
            <p className="text-lg text-gray-600">
              Connect with sports industry professionals, share insights, and stay updated 
              on the latest trends in sports data intelligence.
            </p>
            <div className="mt-8">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8">
                Join Now - It's Free
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Networking</h3>
              <p className="text-gray-600 mb-6">
                Connect with industry peers, share experiences, and build meaningful relationships with professionals who understand your challenges.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" className="p-0 h-auto text-sportbnk-green hover:text-sportbnk-green/80 hover:bg-transparent group">
                  Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Knowledge Sharing</h3>
              <p className="text-gray-600 mb-6">
                Access exclusive resources, participate in discussions, and learn from others' experiences in the sports data industry.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" className="p-0 h-auto text-sportbnk-green hover:text-sportbnk-green/80 hover:bg-transparent group">
                  Explore Resources <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Events</h3>
              <p className="text-gray-600 mb-6">
                Attend virtual and in-person events, webinars, and workshops designed specifically for sports industry professionals.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" className="p-0 h-auto text-sportbnk-green hover:text-sportbnk-green/80 hover:bg-transparent group">
                  View Calendar <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-8 text-center">
              Upcoming Community Events
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EventCard 
                title="Data-Driven Fan Engagement Workshop" 
                description="Learn strategies to enhance fan engagement through data intelligence."
                date="July 12, 2023" 
                location="Virtual"
                type="virtual"
              />
              
              <EventCard 
                title="Sports Tech Networking Mixer" 
                description="Connect with sports technology professionals in a casual setting."
                date="July 18, 2023" 
                location="London, UK"
                type="in-person"
              />
              
              <EventCard 
                title="Sports Data Compliance Webinar" 
                description="Essential knowledge for handling sports data in compliance with regulations."
                date="July 25, 2023" 
                location="Virtual"
                type="virtual"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-8 text-center">
              Featured Community Members
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <MemberCard name="John Smith" role="Director of Analytics" company="SportsTech Inc." />
              <MemberCard name="Sarah Chen" role="Head of Marketing" company="FanBase Media" />
              <MemberCard name="Michael Johnson" role="Talent Acquisition" company="Global Sports" />
              <MemberCard name="Emily Williams" role="CTO" company="AthleteAI" />
              <MemberCard name="David Patel" role="Sports Data Scientist" company="DataSport" />
              <MemberCard name="Lisa Rodriguez" role="CEO" company="FanEngage" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Community;
