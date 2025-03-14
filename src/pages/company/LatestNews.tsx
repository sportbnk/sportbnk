
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

const NewsCard = ({ 
  title, 
  excerpt, 
  date, 
  image, 
  category 
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  image: string; 
  category: string;
}) => (
  <Card className="overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg">
    <div className="aspect-video w-full overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium bg-sportbnk-green/10 text-sportbnk-green px-3 py-1 rounded-full">
          {category}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" /> {date}
        </div>
      </div>
      <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button variant="ghost" className="p-0 h-auto text-sportbnk-green hover:text-sportbnk-green/80 hover:bg-transparent group">
        Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardFooter>
  </Card>
);

const LatestNews = () => {
  return (
    <PageLayout pageTitle="Latest News">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="h-full">
                    <img 
                      src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
                      alt="Sportsbnk Secures Series A Funding" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium bg-sportbnk-green/10 text-sportbnk-green px-3 py-1 rounded-full">
                        Company News
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" /> June 15, 2023
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sportbnk-navy mb-4">
                      Sportsbnk Secures $12M Series A Funding to Accelerate Growth
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Sportsbnk, the leading sports industry data intelligence platform, today announced it has secured $12 million in Series A funding led by SportVentures Capital with participation from existing investors.
                    </p>
                    <Button className="w-fit bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                      Read Full Announcement
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <NewsCard 
              title="Sportsbnk Launches Enhanced Intent Data Features" 
              excerpt="Our platform now includes advanced intent signals to help businesses identify high-value prospects in the sports industry."
              date="May 3, 2023" 
              image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
              category="Product Update"
            />
            
            <NewsCard 
              title="Sportsbnk Partners with Major League Cricket" 
              excerpt="Strategic partnership will enhance data intelligence for cricket organizations and related businesses across the United States."
              date="April 12, 2023" 
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
              category="Partnership"
            />
            
            <NewsCard 
              title="Sportsbnk Expands European Operations" 
              excerpt="Opening of our new London office marks a significant step in our European expansion strategy."
              date="March 28, 2023" 
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png" 
              category="Company News"
            />
            
            <NewsCard 
              title="Introducing the Sportsbnk Partner Program" 
              excerpt="New initiative allows agencies, consultants, and technology providers to leverage Sportsbnk's platform for mutual growth."
              date="February 15, 2023" 
              image="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
              category="Announcement"
            />
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
              Load More News
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LatestNews;
