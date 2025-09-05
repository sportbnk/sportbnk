
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Careers = () => {
  return (
    <PageLayout pageTitle="Careers">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Currently No Open Positions */}
            <div className="text-center bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-sportbnk-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-sportbnk-green" />
              </div>
              <h3 className="text-2xl font-bold text-sportbnk-navy mb-4">
                Currently No Open Positions
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We don't have any open positions at the moment, but we're always interested in hearing from talented individuals.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Send your CV to <a href="mailto:info@sportbnk.com" className="text-sportbnk-green font-semibold hover:underline">info@sportbnk.com</a> and we will update this page if we are hiring.
              </p>
              <Button 
                className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white"
                asChild
              >
                <a href="mailto:info@sportbnk.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Your CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
