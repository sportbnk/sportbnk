
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Clock, Calendar, ArrowRight } from "lucide-react";

const ArticleCard = ({ 
  title, 
  description, 
  date, 
  readTime, 
  image, 
  category 
}: { 
  title: string; 
  description: string; 
  date: string; 
  readTime: string; 
  image: string; 
  category: string;
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
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" /> {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-sportbnk-navy mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" /> {readTime}
          </div>
          <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
            Read Article
          </Button>
        </div>
      </div>
    </div>
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
              Sports Intelligence Insights
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with our latest articles covering trends, strategies, and innovations 
              in the sports data intelligence industry.
            </p>
          </div>
          
          <div className="space-y-8">
            <ArticleCard 
              title="How Data Intelligence is Transforming Sports Marketing" 
              description="Learn how leading sports organizations are leveraging data to enhance their marketing strategies and create more personalized fan experiences."
              date="June 15, 2023" 
              readTime="8 min read" 
              image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png" 
              category="Sports Marketing"
            />
            
            <ArticleCard 
              title="The Future of Fan Engagement Through Data" 
              description="Discover how sports teams are using data intelligence to create deeper connections with fans and enhance the overall spectator experience."
              date="May 28, 2023" 
              readTime="12 min read" 
              image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
              category="Fan Experience"
            />
            
            <ArticleCard 
              title="Navigating Privacy Regulations in Sports Data" 
              description="A comprehensive guide to managing sports data while maintaining compliance with GDPR, CCPA, and other privacy regulations around the world."
              date="May 10, 2023" 
              readTime="10 min read" 
              image="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
              category="Data Compliance"
            />
            
            <ArticleCard 
              title="Measuring ROI in Sports Data Initiatives" 
              description="Practical frameworks and metrics for effectively measuring the return on investment of your sports organization's data intelligence initiatives."
              date="April 25, 2023" 
              readTime="9 min read" 
              image="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
              category="Business Intelligence"
            />
            
            <ArticleCard 
              title="Innovation in Sports Recruitment" 
              description="How data intelligence is transforming talent acquisition in sports, with real-world examples from teams and organizations that have revolutionized their recruiting process."
              date="April 8, 2023" 
              readTime="11 min read" 
              image="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
              category="Recruitment"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;
