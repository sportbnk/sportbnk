
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, HelpCircle, ArrowRight, CheckCircle } from "lucide-react";

const Community = () => {
  return (
    <PageLayout pageTitle="Community">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <MessageCircle className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Join Our Sports Data Community
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with sports industry professionals in our WhatsApp group. Get instant answers 
              to your questions, share insights, and stay connected with the community.
            </p>
            <div className="mt-8">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-3 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-sm p-6">
              <div className="text-center">
                <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                  <HelpCircle className="h-6 w-6 text-sportbnk-green" />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Ask Questions</h3>
                <p className="text-gray-600">
                  Get instant answers from sports data experts and community members. No question is too big or small.
                </p>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <div className="text-center">
                <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-sportbnk-green" />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Network</h3>
                <p className="text-gray-600">
                  Connect with industry peers, share experiences, and build meaningful relationships with professionals.
                </p>
              </div>
            </Card>
            
            <Card className="border-0 shadow-sm p-6">
              <div className="text-center">
                <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                  <MessageCircle className="h-6 w-6 text-sportbnk-green" />
                </div>
                <h3 className="text-xl font-bold text-sportbnk-navy mb-3">Share Insights</h3>
                <p className="text-gray-600">
                  Share your knowledge and learn from others' experiences in the sports data industry.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-sportbnk-green/20 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">
                    What to Expect in Our Community
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-sportbnk-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        <strong>Quick Responses:</strong> Get answers to your sports data questions within hours, not days.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-sportbnk-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        <strong>Expert Knowledge:</strong> Learn from Sportbnk team members and experienced community users.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-sportbnk-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        <strong>Industry Updates:</strong> Stay informed about the latest trends and updates in sports data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-sportbnk-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        <strong>Networking Opportunities:</strong> Connect with professionals from various sports organisations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-3">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join Our WhatsApp Community
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Free to join • Active community • Expert support
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Community;
