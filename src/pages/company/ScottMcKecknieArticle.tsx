
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ScottMcKecknieArticle = () => {
  return (
    <PageLayout pageTitle="Scott McKecknie Joins SportBnk as Advisory Shareholder">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/company/latest-news" className="inline-flex items-center text-sportbnk-green hover:text-sportbnk-green/80 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Latest News
            </Link>
            
            <article>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium bg-sportbnk-green/10 text-sportbnk-green px-3 py-1 rounded-full">
                    Company News
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" /> May 28, 2025
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-6">
                  Scott McKecknie from Plai Sport Joins SportBnk as Advisory Shareholder
                </h1>
                
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                  <img 
                    src="/lovable-uploads/94f20b65-d719-4240-b79f-110e5fbe89de.png" 
                    alt="Scott McKecknie joins SportBnk as Advisory Shareholder" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  We're thrilled to announce that Scott McKecknie, founder and CEO of Plai Sport, has joined SportBnk as an advisory shareholder. This strategic partnership brings invaluable industry expertise and leadership to our mission of revolutionizing sports data intelligence.
                </p>
                
                <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">About Scott McKecknie and Plai Sport</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Scott McKecknie is a visionary leader in the sports technology sector, having founded and led Plai Sport to become a recognized innovator in sports platform solutions. With years of experience building successful sports-focused businesses, Scott brings deep industry knowledge and strategic insight that will be instrumental in SportBnk's continued growth.
                </p>
                
                <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">Strategic Value for SportBnk</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Scott's involvement as an advisory shareholder represents more than just financial investment—it's a strategic partnership that aligns perfectly with our vision. His expertise in sports business development, technology innovation, and market expansion will provide invaluable guidance as we scale our data intelligence platform to serve more organizations across the sports industry.
                </p>
                
                <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">Looking Forward</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  This partnership marks an exciting milestone in SportBnk's journey. With Scott's advisory support and Plai Sport's industry connections, we're better positioned than ever to deliver innovative data intelligence solutions that help sports organizations make smarter, data-driven decisions.
                </p>
                
                <Card className="bg-sportbnk-lightGrey p-6 mb-8">
                  <blockquote className="text-lg italic text-sportbnk-navy mb-4">
                    "SportBnk represents the future of sports data intelligence. Their innovative approach to helping organizations unlock the power of their data aligns perfectly with the industry's evolving needs. I'm excited to support their mission and contribute to their continued success."
                  </blockquote>
                  <cite className="text-sm text-gray-600">— Scott McKecknie, Founder & CEO, Plai Sport</cite>
                </Card>
                
                <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                  <Button asChild className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                    <a href="https://plaisport.com" target="_blank" rel="noopener noreferrer">
                      Learn More About Plai Sport <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white">
                    <Link to="/company/about">
                      About SportBnk
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ScottMcKecknieArticle;
