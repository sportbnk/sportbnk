
import { useEffect, useRef } from 'react';
import { Api, Mail, Database, ListChecks, Clock, Briefcase } from 'lucide-react';

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
    <section className="py-24 bg-sportbnk-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by Enterprise Technology
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Our platform is built on cutting-edge technologies to ensure scalability, reliability, and performance.
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-when-visible"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Briefcase className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">CRM Integration</h3>
            <p className="text-gray-300">
              Seamlessly integrate with popular CRM platforms like Salesforce, HubSpot, and Pipedrive to enhance your sales process.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Mail className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Integration</h3>
            <p className="text-gray-300">
              Connect with leading email marketing platforms to nurture leads and build targeted campaigns for sports industry professionals.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <ListChecks className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">List Building</h3>
            <p className="text-gray-300">
              Create highly targeted lists of sports organizations and professionals using our advanced filtering and segmentation tools.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Database className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Accurate & Compliant Data</h3>
            <p className="text-gray-300">
              Access verified, up-to-date sports industry contact information that meets global compliance standards including GDPR and CCPA.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Clock className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Job Changes Update</h3>
            <p className="text-gray-300">
              Stay informed about personnel movements within the sports industry with automated notifications about relevant job changes.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Api className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">API Ecosystem</h3>
            <p className="text-gray-300">
              Leverage our comprehensive API ecosystem for seamless integration with your existing systems and customized data workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
