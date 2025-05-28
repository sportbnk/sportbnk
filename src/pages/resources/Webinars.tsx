
import PageLayout from "@/components/PageLayout";
import { Video } from "lucide-react";

const Webinars = () => {
  return (
    <PageLayout pageTitle="Webinars">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
              <Video className="h-8 w-8 text-sportbnk-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
              Educational Webinars
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Learn from industry experts through our series of webinars covering the latest trends, 
              strategies, and innovations in sports data intelligence.
            </p>
            
            <div className="bg-sportbnk-lightGrey rounded-xl p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-bold text-sportbnk-navy mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-gray-600">
                We're preparing exciting webinar content for you. Stay tuned for announcements about our upcoming educational sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Webinars;
