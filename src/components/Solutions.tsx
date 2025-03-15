
import { useEffect, useRef } from 'react';
import { ArrowRight, Database, LineChart, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Solutions = () => {
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
    <section id="solutions" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
            Enterprise-Grade Sports Data Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            The mission of SportBnk is creating a single space to find sports-data solutions for all
            industries with one click, using the most innovative technologies.
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-when-visible"
        >
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Database className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Global Data Coverage</h3>
            <p className="text-gray-600 mb-6">Access to 360,000+ live competitions and 750,000+ sports teams worldwide.</p>
            <Link to="/products/discover" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <LineChart className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Real-Time Analytics</h3>
            <p className="text-gray-600 mb-6">Process and analyze sports data in real-time for immediate actionable insights.</p>
            <Link to="/products/boost" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Shield className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Enterprise Security</h3>
            <p className="text-gray-600 mb-6">Advanced security protocols and compliance with industry data standards.</p>
            <Link to="/company/about" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Globe className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Global Connectivity</h3>
            <p className="text-gray-600 mb-6">Connect with sports organizations and professionals across continents.</p>
            <Link to="/products/recruit" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white py-6 px-8 rounded-md text-lg"
            asChild
          >
            <Link to="/products">
              Explore All Solutions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
