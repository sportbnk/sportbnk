
import { useEffect, useRef } from 'react';
import { Shield, Users, Globe, Award } from 'lucide-react';

const TrustedSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  const stats = [
    {
      icon: Users,
      number: "750,000+",
      label: "Sports Teams",
      description: "Connected worldwide"
    },
    {
      icon: Globe,
      number: "3.5M+",
      label: "Employees",
      description: "In our database"
    },
    {
      icon: Shield,
      number: "99.9%",
      label: "Data Accuracy",
      description: "Verified & validated"
    },
    {
      icon: Award,
      number: "#1",
      label: "B2B Platform",
      description: "In sports intelligence"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-sportbnk-navy via-sportbnk-navy/95 to-sportbnk-navy/90 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={contentRef}
          className="text-center mb-16 animate-when-visible"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Sports Industry's Most Trusted Intelligence Platform
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Sportbnk connects you with real-time signals and comprehensive data from the global sports ecosystem. Our platform delivers the right information, actionable insights, and direct connections — making it easier for sports professionals to move faster and achieve more.
          </p>
        </div>
        
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-when-visible"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-sportbnk-green/50 transition-colors">
                <div className="mb-4 flex justify-center">
                  <div className="bg-sportbnk-green/20 p-3 rounded-full group-hover:bg-sportbnk-green/30 transition-colors">
                    <stat.icon className="w-8 h-8 text-sportbnk-green" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-sportbnk-green mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="w-2 h-2 bg-sportbnk-green rounded-full animate-pulse"></div>
            <span className="text-gray-300">Trusted by organisations worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
