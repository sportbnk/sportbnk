
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Search, BarChart3, Rocket, UserPlus } from "lucide-react";

const ProductCard = ({ 
  title, 
  description, 
  icon,
  features 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  features: string[];
}) => (
  <Card className="h-full transition-all duration-300 hover:shadow-xl border-gray-200">
    <CardHeader className="pb-4">
      <div className="mb-4 bg-sportbnk-green/10 w-12 h-12 rounded-lg flex items-center justify-center">
        <div className="text-sportbnk-green">{icon}</div>
      </div>
      <CardTitle className="text-2xl font-bold text-sportbnk-navy">{title}</CardTitle>
      <CardDescription className="text-gray-600 mt-2">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-sportbnk-green mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
        Learn More
      </Button>
    </CardContent>
  </Card>
);

const Products = () => {
  return (
    <PageLayout pageTitle="Our Products">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-xl text-center max-w-4xl mx-auto mb-16 text-gray-600">
            Our comprehensive suite of tools designed specifically for the sports industry
            empowers your business to connect, engage, and grow in this specialized market.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            <ProductCard 
              title="Discover" 
              icon={<Search size={24} />}
              description="Build highly targeted lists of sports organizations, teams, and professionals with powerful filtering options."
              features={[
                "Powerful filtering options",
                "Sport-specific data fields",
                "High-quality contact information",
                "Easily exportable lists"
              ]}
            />
            
            <ProductCard 
              title="Boost" 
              icon={<Rocket size={24} />}
              description="Enhance your existing customer databases by appending missing or outdated information."
              features={[
                "Data enrichment tools",
                "Update incomplete records",
                "Maintain accurate profiles",
                "Improve conversion rates"
              ]}
            />
            
            <ProductCard 
              title="Intent Data" 
              icon={<BarChart3 size={24} />}
              description="Get actionable insights into organizations actively seeking products or services in the sports industry."
              features={[
                "Identify high-priority leads",
                "Increase conversion rates",
                "Prioritize sales efforts",
                "Comprehensive analytics"
              ]}
            />
            
            <ProductCard 
              title="Recruit" 
              icon={<UserPlus size={24} />}
              description="A streamlined hiring platform specifically designed for organizations in the sports industry."
              features={[
                "Direct candidate communication",
                "Sports industry focus",
                "No candidate exporting",
                "Clear terms & conditions"
              ]}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">Why Choose Sportsbnk</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlike broader sales intelligence platforms, Sportsbnk is dedicated exclusively to the sports sector, 
              providing tailored solutions for your specific challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 border-0 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Industry-Specific</h3>
                <p className="text-gray-600">
                  Our focus on sports gives you access to data and tools specifically designed for your industry.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 border-0 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Compliance Assured</h3>
                <p className="text-gray-600">
                  All data is fully compliant with global standards, including GDPR and CCPA.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 border-0 shadow-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Actionable Insights</h3>
                <p className="text-gray-600">
                  Transform raw data into strategic decisions and meaningful connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Products;
