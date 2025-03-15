
import { useEffect, useRef } from 'react';
import { Shield, Zap, BarChart2, Users } from 'lucide-react';

type BenefitCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delayClass: string;
};

const BenefitCard = ({ icon, title, description, delayClass }: BenefitCardProps) => {
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
      className={`bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all animate-when-visible ${delayClass} border border-gray-100`}
    >
      <div className="flex justify-center mb-6">
        <div className="bg-sportbnk-green/10 p-4 rounded-full">
          <div className="text-sportbnk-green">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-sportbnk-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sportbnk-navy">
            Why Sports Organizations Choose SportBnk
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your sports data into actionable insights with our comprehensive platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard 
            icon={<Shield size={32} />} 
            title="Enterprise Security"
            description="Bank-grade security systems to protect your sensitive sports data with end-to-end encryption."
            delayClass="delay-100"
          />
          <BenefitCard 
            icon={<Zap size={32} />} 
            title="Lightning Fast"
            description="Process millions of data points in seconds with our high-performance architecture."
            delayClass="delay-200"
          />
          <BenefitCard 
            icon={<BarChart2 size={32} />} 
            title="Advanced Analytics"
            description="Make data-driven decisions with predictive modeling and AI-powered insights."
            delayClass="delay-300"
          />
          <BenefitCard 
            icon={<Users size={32} />} 
            title="Team Collaboration"
            description="Seamlessly share insights across departments with role-based access controls."
            delayClass="delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
