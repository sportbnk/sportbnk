
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CaseStudies = () => {
  return (
    <PageLayout pageTitle="Case Studies">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-4">
              Success Stories from the Sports Industry
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how organisations across the sports industry have achieved their goals with our solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-sportbnk-lightGrey flex items-center justify-center">
                <FileText className="h-16 w-16 text-sportbnk-green opacity-50" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-sportbnk-lightGrey text-sportbnk-navy rounded-full text-sm font-medium mb-3">
                  Stadium Operations
                </span>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                  How Stadium XYZ Increased Attendance by 35%
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how Stadium XYZ leveraged data analytics to boost ticket sales and improve fan engagement.
                </p>
                <Button variant="outline" className="w-full">
                  Read Case Study
                </Button>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-sportbnk-lightGrey flex items-center justify-center">
                <FileText className="h-16 w-16 text-sportbnk-green opacity-50" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-sportbnk-lightGrey text-sportbnk-navy rounded-full text-sm font-medium mb-3">
                  Team Management
                </span>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                  Team ABC's Digital Transformation Journey
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how Team ABC revolutionized their operations with our comprehensive data solutions.
                </p>
                <Button variant="outline" className="w-full">
                  Read Case Study
                </Button>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-sportbnk-lightGrey flex items-center justify-center">
                <FileText className="h-16 w-16 text-sportbnk-green opacity-50" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-sportbnk-lightGrey text-sportbnk-navy rounded-full text-sm font-medium mb-3">
                  Sports Retail
                </span>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-2">
                  How Sports Retailer DEF Doubled Online Sales
                </h3>
                <p className="text-gray-600 mb-4">
                  See how retailer DEF used our intent data to optimize their marketing strategy and boost conversions.
                </p>
                <Button variant="outline" className="w-full">
                  Read Case Study
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudies;
