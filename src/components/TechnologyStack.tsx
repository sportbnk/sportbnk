
import { useEffect, useRef } from 'react';
import { Code, Database, Server, Cpu, Cloud, Lock } from 'lucide-react';

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
              <Code className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Modern Architecture</h3>
            <p className="text-gray-300">
              Built with microservices architecture for maximum flexibility and scalability.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Database className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Distributed Data Storage</h3>
            <p className="text-gray-300">
              Geo-distributed database system for fast data access anywhere in the world.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Cloud className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Cloud Infrastructure</h3>
            <p className="text-gray-300">
              Hosted on enterprise-grade cloud infrastructure for maximum uptime and reliability.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Cpu className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI & Machine Learning</h3>
            <p className="text-gray-300">
              Advanced AI algorithms for sports data analytics and predictive insights.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Server className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">API Ecosystem</h3>
            <p className="text-gray-300">
              Comprehensive API ecosystem for seamless integration with your existing systems.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="mb-4">
              <Lock className="text-sportbnk-green w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
            <p className="text-gray-300">
              Bank-grade security protocols and compliance with international data standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
