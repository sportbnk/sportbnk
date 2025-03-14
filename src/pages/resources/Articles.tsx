
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Calendar, ArrowRight } from "lucide-react";

const ArticleCard = ({ 
  title, 
  excerpt, 
  date, 
  image, 
  category, 
  readTime 
}: { 
  title: string; 
  excerpt: string; 
  date: string; 
  image: string; 
  category: string;
  readTime: string;
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
      <p className="text-gray-600 mb-2">{excerpt}</p>
      <p className="text-sm text-gray-500">{readTime} min read</p>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button variant="ghost" className="p-0 h-auto text-sportbnk-green hover:text-sportbnk-green/80 hover:bg-transparent group">
        Read Article <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardFooter>
  </Card>
);

const Articles = () => {
  return (
    <PageLayout pageTitle="Articles">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <FileText className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Industry Insights & Knowledge
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with our collection of in-depth articles covering the latest trends, 
              strategies, and innovations in the sports industry data intelligence.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <Button variant="outline" className="rounded-full">All Topics</Button>
            <Button variant="outline" className="rounded-full">Data Intelligence</Button>
            <Button variant="outline" className="rounded-full">Sports Marketing</Button>
            <Button variant="outline" className="rounded-full">Recruitment</Button>
            <Button variant="outline" className="rounded-full">Technology</Button>
            <Button variant="outline" className="rounded-full">Industry Trends</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ArticleCard 
              title="The Future of Fan Engagement: Data-Driven Strategies" 
              excerpt="How sports organizations are leveraging data to create more personalized fan experiences."
              date="June 3, 2023" 
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png" 
              category="Fan Engagement"
              readTime="8"
            />
            
            <ArticleCard 
              title="Sports Recruitment Trends for 2023 and Beyond" 
              excerpt="Key trends shaping how sports organizations find and retain top talent in a competitive market."
              date="May 21, 2023" 
              image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
              category="Recruitment"
              readTime="10"
            />
            
            <ArticleCard 
              title="Harnessing Intent Data to Drive Sports Sponsorships" 
              excerpt="Using behavioral signals to identify and secure more effective sponsorship deals."
              date="May 14, 2023" 
              image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
              category="Sponsorship"
              readTime="7"
            />
            
            <ArticleCard 
              title="GDPR and Sports Data: Navigating Compliance" 
              excerpt="A comprehensive guide to maintaining data compliance in the sports industry."
              date="April 28, 2023" 
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
              category="Compliance"
              readTime="12"
            />
            
            <ArticleCard 
              title="Building a Data-Driven Sports Organization" 
              excerpt="Steps to transform your sports business into a data-first operation."
              date="April 15, 2023" 
              image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
              category="Strategy"
              readTime="9"
            />
            
            <ArticleCard 
              title="The ROI of Sports Data Intelligence" 
              excerpt="Measuring the return on investment for data intelligence initiatives in sports."
              date="April 2, 2023" 
              image="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
              category="Business"
              readTime="6"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;
