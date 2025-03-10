
import { useEffect, useRef } from 'react';
import { Clock, RefreshCw, Search, Package, Target, BarChart } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  delay: string;
};

const FeatureCard = ({ icon, title, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && cardRef.current) {
          cardRef.current.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow animate-when-visible ${delay}`}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-sportbnk-green/10 p-4 rounded-full">
          <div className="text-sportbnk-green">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-sportbnk-navy">{title}</h3>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-16 text-center text-sportbnk-navy">
          Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Clock size={32} />} 
            title="Real-Time Data Updates" 
            delay="delay-100"
          />
          <FeatureCard 
            icon={<RefreshCw size={32} />} 
            title="Seamless Integration" 
            delay="delay-200"
          />
          <FeatureCard 
            icon={<Search size={32} />} 
            title="Advanced Search & Filtering" 
            delay="delay-300"
          />
          <FeatureCard 
            icon={<Package size={32} />} 
            title="Automated Content Enrichment" 
            delay="delay-100"
          />
          <FeatureCard 
            icon={<Target size={32} />} 
            title="AI-Powered Auto Event Tracking" 
            delay="delay-200"
          />
          <FeatureCard 
            icon={<BarChart size={32} />} 
            title="Lead Generation & Business Insights" 
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
