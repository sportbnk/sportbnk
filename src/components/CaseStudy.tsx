
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

type CaseStudyProps = {
  title: string;
  description: string;
  image: string;
  isReversed?: boolean;
  color: "green" | "navy";
};

const CaseStudy = ({ title, description, image, isReversed = false, color }: CaseStudyProps) => {
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

  const bgColor = color === "green" ? "bg-sportbnk-green" : "bg-sportbnk-navy";
  const textColor = color === "green" ? "text-sportbnk-navy" : "text-white";
  const buttonVariant = color === "green" ? "outline" : "default";
  const buttonClass = color === "green" 
    ? "border-sportbnk-navy text-sportbnk-navy hover:bg-sportbnk-navy hover:text-white" 
    : "bg-sportbnk-green hover:bg-sportbnk-green/90 text-white";

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={cardRef}
          className={`rounded-2xl overflow-hidden shadow-lg animate-when-visible ${bgColor}`}
        >
          <div className={`grid md:grid-cols-2 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-8 md:p-12 ${textColor} ${isReversed ? 'order-2' : 'order-1'}`}>
              <div className="mb-2 text-sm font-medium uppercase tracking-wider">CASE STUDY</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
              <p className="mb-6 leading-relaxed">{description}</p>
              <Button variant={buttonVariant === "outline" ? "outline" : "default"} className={`rounded-md ${buttonClass}`}>
                Read More
              </Button>
            </div>
            <div className={`${isReversed ? 'order-1' : 'order-2'}`}>
              <img 
                src={image} 
                alt={title} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  return (
    <section className="py-8 md:py-16">
      <CaseStudy
        title="The Global Sports Industry"
        description="The Sports Analytics Market size was estimated at $2.2 Billion in 2021 and is expected to reach $6.4 Billion by 2025, with a CAGR of 31.2% during the forecast period. With Sportbnk's platform, you'll be at the forefront of this growing market, powered by comprehensive data insights. Our platform was designed to handle this kind of growth making the most innovative solution in the marketplace."
        image="/lovable-uploads/d09f910d-17b2-4f81-bc3b-66badacf3de2.png"
        color="green"
      />
      <CaseStudy
        title="The European Sports Market"
        description="Europe's sports industry is one of the fastest growing sectors, accounting for 2% of EU's total GDP. With Sportbnk's platform, you get access to data from teams and competitions all across Europe, leveraging comprehensive statistics. Our AI-powered predictions enable precise forecasting, while our seamless CRM integration streamlines workflow for sports organizations across the continent."
        image="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png"
        color="navy"
        isReversed={true}
      />
    </section>
  );
};

export default CaseStudies;
