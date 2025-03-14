
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Book, Video, File, MessageSquare } from "lucide-react";

const HelpCenter = () => {
  return (
    <PageLayout pageTitle="Help Center">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions and learn how to get the most out of our solutions.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Input 
                className="pr-12 py-6 text-lg" 
                placeholder="Search for help articles..." 
              />
              <Button 
                className="absolute right-1 top-1 bottom-1 bg-sportbnk-green hover:bg-sportbnk-green/90"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">
                Detailed guides and reference materials for all of our products.
              </p>
              <Button variant="outline" className="w-full">View Docs</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Step-by-step visual guides to help you master our platform.
              </p>
              <Button variant="outline" className="w-full">Watch Videos</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <File className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">FAQs</h3>
              <p className="text-gray-600 mb-4">
                Quick answers to the most common questions we receive.
              </p>
              <Button variant="outline" className="w-full">Read FAQs</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">
                Get help from our dedicated support team.
              </p>
              <Button variant="outline" className="w-full">Contact Us</Button>
            </div>
          </div>

          <div className="bg-sportbnk-lightGrey rounded-lg p-8 text-center">
            <HelpCircle className="h-12 w-12 text-sportbnk-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-2">Still Need Help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is available Monday through Friday, 9am to 6pm EST. 
              We're committed to responding to all inquiries within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Submit a Ticket
              </Button>
              <Button variant="outline">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpCenter;
