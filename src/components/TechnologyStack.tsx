
import { useEffect, useRef } from 'react';
import { Database, Activity, Filter, ListChecks, FileText, TrendingUp, Download } from 'lucide-react';

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
            Built on cutting-edge infrastructure to deliver scalability, reliability, and speed — ready to grow with your business.
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
              Access verified, up-to-date contacts and insights across the sports industry, with full compliance to GDPR and CCPA.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Activity className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Signals & Job Changes</h3>
            <p className="text-gray-600">
              Track key movements and buying signals across clubs, sponsors, and decision-makers with real-time updates.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Filter className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Smart Filtering</h3>
            <p className="text-gray-600">
              Quickly narrow searches with advanced filters to find the exact people, organisations, or opportunities you need.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <ListChecks className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Targeted List Building</h3>
            <p className="text-gray-600">
              Create precise, segmented lists of sports organisations and professionals to fuel smarter outreach.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <Download className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Easy Export & Integrations</h3>
            <p className="text-gray-600">
              Export data to CSV or connect directly into your CRM and marketing stack for seamless workflows.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-4">
              <TrendingUp className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Sales Intelligence</h3>
            <p className="text-gray-600">
              Turn insights into action — driving pipeline growth, stronger conversions, and better ROI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
