
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ 
  title, 
  location, 
  department, 
  type 
}: { 
  title: string; 
  location: string; 
  department: string; 
  type: string;
}) => (
  <Card className="border-gray-200 transition-all duration-300 hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-sportbnk-navy">{title}</h3>
          <p className="text-gray-600">{department}</p>
        </div>
        <div className="bg-sportbnk-green/10 text-sportbnk-green text-sm px-3 py-1 rounded-full">
          {type}
        </div>
      </div>
      <p className="flex items-center text-gray-600">
        <span className="mr-2">📍</span>{location}
      </p>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button variant="outline" className="w-full border-sportbnk-green text-sportbnk-green hover:bg-sportbnk-green hover:text-white" asChild>
        <Link to="/company/careers">View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Careers = () => {
  return (
    <PageLayout pageTitle="Careers">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600">
              We're looking for passionate individuals who share our mission to transform how businesses 
              connect in the sports industry. At Sportsbnk, you'll work with cutting-edge technology 
              while making a real impact in a dynamic and fast-growing sector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <JobCard 
              title="Senior Data Scientist" 
              location="London, UK" 
              department="Data Science" 
              type="Full-time"
            />
            <JobCard 
              title="Sales Development Rep" 
              location="Remote" 
              department="Sales" 
              type="Full-time"
            />
            <JobCard 
              title="Content Marketing Specialist" 
              location="New York, US" 
              department="Marketing" 
              type="Full-time"
            />
            <JobCard 
              title="Front-End Developer" 
              location="Remote" 
              department="Engineering" 
              type="Full-time"
            />
            <JobCard 
              title="Customer Success Manager" 
              location="London, UK" 
              department="Customer Success" 
              type="Full-time"
            />
            <JobCard 
              title="Sports Data Analyst" 
              location="Remote" 
              department="Data" 
              type="Contract"
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">
                Life at Sportsbnk
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe in creating a workplace where innovation thrives and everyone can do their best work. Our culture is built on collaboration, continuous learning, and a shared passion for sports and data.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Flexible remote-first working environment</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Competitive compensation and equity options</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Comprehensive health benefits and wellness programs</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Continuous learning and development opportunities</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" 
                alt="Life at Sportsbnk" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
