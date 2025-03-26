
import { useEffect, useRef } from 'react';

const TrustedSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-sportbnk-lightGrey">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-16 text-center text-sportbnk-navy">
          Most Trusted B2B Sports Data
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            ref={contentRef}
            className="animate-when-visible"
          >
            <p className="text-lg text-gray-700 mb-6">
              Sportbnk is the trusted value B2B Sports Intelligence Platform, connecting you with data from more than 750,000 sports teams and 360,000+ contests. Our AI-driven platform offers outstanding UX personalization, combined with machine learning predictions. With seamless CRM and Native Integration, and help from professionals, it's true all-in-one solution.
            </p>
          </div>
          
          <div 
            ref={imageRef}
            className="animate-when-visible"
          >
            <img 
              src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" 
              alt="Young hockey players facing off on the ice" 
              className="rounded-lg shadow-lg w-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
