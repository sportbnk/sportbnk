
import { useEffect, useRef } from 'react';
import { ArrowRight, Briefcase, LineChart, TrendingUp, Users } from 'lucide-react';
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
            Want to see how sportbnk is helping businesses build stronger pipelines?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The mission of SportBnk is creating a single space to find sports-data solutions for all
            industries with one click, using the most innovative technologies.
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-when-visible"
        >
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Briefcase className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Sales</h3>
            <p className="text-gray-600 mb-6">Find qualified leads and decision-makers within sports organisations to expand your customer base and drive revenue growth.</p>
            <Link to="/products/discover" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <TrendingUp className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Marketing</h3>
            <p className="text-gray-600 mb-6">Target and engage with the right audience in the sports industry to build brand awareness and enhance marketing campaigns.</p>
            <Link to="/products/boost" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-sportbnk-green/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Users className="text-sportbnk-green w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-sportbnk-navy">Hiring</h3>
            <p className="text-gray-600 mb-6">Connect with top talent in the sports industry to build high-performing teams with specialized knowledge and experience.</p>
            <Link to="/products/recruit" className="inline-flex items-center text-sportbnk-green font-medium hover:underline">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
