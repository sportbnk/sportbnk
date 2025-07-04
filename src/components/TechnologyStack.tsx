
import { useEffect, useRef } from 'react';
import { Database, Clock, Filter, ListChecks, FileText, TrendingUp } from 'lucide-react';

const TechnologyStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sportbnk-navy">
            Powered by Enterprise Technology
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform is built on cutting-edge technologies to ensure scalability, reliability, and performance.
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-when-visible"
        >
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Database className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Accurate & Compliant Data</h3>
            <p className="text-gray-600">
              Access verified, up-to-date sports industry contact information that meets global compliance standards including GDPR and CCPA.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Clock className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Job Changes</h3>
            <p className="text-gray-600">
              Stay informed about personnel movements within the sports industry with automated notifications about relevant job changes.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Filter className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Filtering System</h3>
            <p className="text-gray-600">
              Use advanced filtering capabilities to narrow down your search and find exactly the sports professionals you need.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <ListChecks className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">List Building</h3>
            <p className="text-gray-600">
              Create highly targeted lists of sports organizations and professionals using our advanced segmentation tools.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <FileText className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">CSV Export</h3>
            <p className="text-gray-600">
              Export your contact lists and data in CSV format for seamless integration with your existing CRM and marketing tools.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <TrendingUp className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Increasing Your Sales</h3>
            <p className="text-gray-600">
              Boost your sales performance with data-driven insights and targeted outreach to the right sports industry contacts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
