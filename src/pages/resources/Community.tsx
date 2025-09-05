
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, HelpCircle, ArrowRight, CheckCircle } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

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
              <WaitlistDialog>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-3 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join Waitlist
                </Button>
              </WaitlistDialog>
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
        </div>
      </section>
    </PageLayout>
  );
};

export default Community;
