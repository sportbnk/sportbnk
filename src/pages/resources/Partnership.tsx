import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Code, MessageCircle, ArrowRight, Handshake } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Partnership = () => {
  return (
    <PageLayout 
      pageTitle="Partner with Sportbnk" 
      metaDescription="Partner with Sportbnk and grow with the leading intelligence platform for global sport. Explore affiliate, technology partner, and ambassador programs."
      metaKeywords="Sportbnk partnerships, affiliate program, technology partners, ambassadors, sports data partnerships"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Handshake className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-6">
              Partner with Sportbnk — Let's Win Together
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a marketer, a technology innovator, or a sports industry professional — there's a way to partner with Sportbnk. Explore how you can grow with the leading intelligence platform for global sport.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="inline-block p-4 bg-sportbnk-green/10 rounded-lg mb-6">
                  <Users className="h-8 w-8 text-sportbnk-green" />
                </div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Affiliates</h3>
                <p className="text-gray-600 mb-8">
                  Promote Sportbnk and earn commissions for every customer you refer. Perfect for agencies, marketers, and sales professionals with strong networks in sport.
                </p>
                <WaitlistDialog>
                  <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white w-full">
                    Become an Affiliate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </WaitlistDialog>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="inline-block p-4 bg-sportbnk-green/10 rounded-lg mb-6">
                  <Code className="h-8 w-8 text-sportbnk-green" />
                </div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Technology Partners</h3>
                <p className="text-gray-600 mb-8">
                  Build with Sportbnk's API or integrate our intelligence into your platform. Ideal for developers, sports tech companies, and solution providers.
                </p>
                <WaitlistDialog>
                  <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white w-full">
                    Become a Technology Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </WaitlistDialog>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="inline-block p-4 bg-sportbnk-green/10 rounded-lg mb-6">
                  <MessageCircle className="h-8 w-8 text-sportbnk-green" />
                </div>
                <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">Ambassadors</h3>
                <p className="text-gray-600 mb-8">
                  Share Sportbnk across your social channels and community, and earn rewards for every referral. Perfect if you're active on LinkedIn, YouTube, TikTok, Instagram, or X.
                </p>
                <WaitlistDialog>
                  <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white w-full">
                    Become an Ambassador
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </WaitlistDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Partnership;