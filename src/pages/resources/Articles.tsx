
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleCard = ({ 
  title, 
  description, 
  date, 
  readTime, 
  image, 
  category,
  href
}: { 
  title: string; 
  description: string; 
  date: string; 
  readTime: string; 
  image: string; 
  category: string;
  href: string;
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
          <Button asChild className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
            <Link to={href}>
              Read Article
            </Link>
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
              title="SportBnk vs SportBank: Understanding Our Brand" 
              description="Discover why we chose SportBnk as our brand name, how it relates to SportBank, and what makes our sports intelligence platform unique in the industry. Learn about our mission to revolutionize sports data management."
              date="April 23, 2025" 
              readTime="5 min read" 
              image="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
              category="Company"
              href="/resources/articles/sportbnk-vs-sportbank"
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
