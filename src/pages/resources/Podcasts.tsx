
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Headphones, Clock, Calendar, ArrowRight } from "lucide-react";

const PodcastCard = ({ 
  title, 
  description, 
  date, 
  duration, 
  image, 
  episode 
}: { 
  title: string; 
  description: string; 
  date: string; 
  duration: string; 
  image: string; 
  episode: string;
}) => (
  <Card className="overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg">
    <div className="grid md:grid-cols-3">
      <div className="md:col-span-1">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:col-span-2 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium bg-sportbnk-green/10 text-sportbnk-green px-3 py-1 rounded-full">
            Episode {episode}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" /> {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" /> {duration}
          </div>
          <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
            Listen Now
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const Podcasts = () => {
  return (
    <PageLayout pageTitle="Podcasts">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Headphones className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              The Sports Data Intelligence Podcast
            </h2>
            <p className="text-lg text-gray-600">
              Join our hosts as they interview sports industry experts, discuss emerging trends, 
              and share insights on how data is transforming the business of sports.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><line x1="16" y1="12" x2="16" y2="12"></line><line x1="8" y1="12" x2="8" y2="12"></line></svg>
                Apple Podcasts
              </Button>
              <Button className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M12 8v8m-4-4h8"></path></svg>
                Spotify
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                Google Podcasts
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <PodcastCard 
              title="The Future of Fan Engagement Through Data" 
              description="In this episode, we explore how sports organizations are leveraging data to create more personalized and engaging fan experiences, with insights from top fan engagement experts."
              date="June 15, 2023" 
              duration="45 min" 
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png" 
              episode="12"
            />
            
            <PodcastCard 
              title="Navigating Privacy Regulations in Sports Data" 
              description="Our legal experts discuss the complexities of managing sports data while maintaining compliance with GDPR, CCPA, and other privacy regulations around the world."
              date="May 28, 2023" 
              duration="52 min" 
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
              episode="11"
            />
            
            <PodcastCard 
              title="Innovation in Sports Recruitment" 
              description="Discover how data intelligence is transforming talent acquisition in sports, with real-world examples from teams and organizations that have revolutionized their recruiting process."
              date="May 10, 2023" 
              duration="48 min" 
              image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
              episode="10"
            />
            
            <PodcastCard 
              title="The Rise of Intent Data in Sports Marketing" 
              description="Learn how intent signals are helping sports organizations identify and prioritize high-value prospects, with expert insights from leading marketing professionals."
              date="April 25, 2023" 
              duration="41 min" 
              image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
              episode="09"
            />
            
            <PodcastCard 
              title="Measuring ROI in Sports Data Initiatives" 
              description="A deep dive into how sports organizations can effectively measure the return on investment of their data intelligence initiatives, with practical frameworks and metrics."
              date="April 8, 2023" 
              duration="56 min" 
              image="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
              episode="08"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
              View All Episodes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Podcasts;
