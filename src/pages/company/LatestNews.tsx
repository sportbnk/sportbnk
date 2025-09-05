
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const LatestNews = () => {
  return (
    <PageLayout pageTitle="Latest News">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="h-96 md:h-full">
                  <img 
                    src="/lovable-uploads/94f20b65-d719-4240-b79f-110e5fbe89de.png" 
                    alt="Scott McKecknie joins SportBnk as Advisory Shareholder" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium bg-sportbnk-green/10 text-sportbnk-green px-3 py-1 rounded-full">
                      Company News
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" /> September 5, 2025
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-sportbnk-navy mb-4">
                    Scott McKecknie from Plai Sport Joins SportBnk as Advisory Shareholder
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We're excited to announce that Scott McKecknie, founder and CEO of Plai Sport, has joined SportBnk as an advisory shareholder, bringing valuable industry expertise to accelerate our growth in the sports data intelligence sector.
                  </p>
                  <Link to="/company/news/scott-mckecknie-advisory-shareholder">
                    <Button className="w-fit bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                      Read Full Article
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LatestNews;
