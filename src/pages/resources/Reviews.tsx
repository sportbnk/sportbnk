
import PageLayout from "@/components/PageLayout";
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <PageLayout pageTitle="Reviews">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-sportbnk-navy mb-4">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read authentic reviews from organizations that have transformed their operations with our solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex text-yellow-400 mb-3">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The data insights we've gained have completely transformed our fan engagement strategy. We're seeing higher retention rates and increased per-game spending."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-sportbnk-navy flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-500">Marketing Director, Team XYZ</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex text-yellow-400 mb-3">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The recruitment platform helped us find specialized talent that understands the unique challenges of the sports industry. Our team is stronger than ever."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-sportbnk-green flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-gray-500">HR Manager, Stadium ABC</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex text-yellow-400 mb-3">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The intent data helped us target our marketing efforts with incredible precision. Our ROI on advertising has improved dramatically since implementing this solution."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-sportbnk-navy flex items-center justify-center text-white font-bold">
                  RJ
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">CMO, Sports Retailer DEF</p>
                </div>
              </div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex text-yellow-400 mb-3">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The customer service team is outstanding. They helped us implement complex data solutions with minimal disruption to our operations."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-sportbnk-green flex items-center justify-center text-white font-bold">
                  EW
                </div>
                <div className="ml-3">
                  <h4 className="font-bold">Emily Wilson</h4>
                  <p className="text-sm text-gray-500">Operations Director, League GHI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Reviews;
