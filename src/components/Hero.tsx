
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imageRef.current) {
          imageRef.current.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden hexagon-pattern">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6 max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-sportbnk-navy animate-slideUp">
              B2B Sports Intelligence Platform
            </h1>
            <p className="text-lg text-gray-600 animate-slideUp delay-100">
              The world's #1 data intelligence platform with more than 750,000+ sports teams and 360,000+ competitions in 110+ sports disciplines.
            </p>
            <div className="pt-4 animate-slideUp delay-200">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md px-8 py-6 text-lg">
                Book a Demo
              </Button>
            </div>
          </div>
          
          <div 
            ref={imageRef} 
            className="animate-when-visible"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sportbnk-green/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sportbnk-navy/20 rounded-full blur-2xl"></div>
              
              <img 
                src="/lovable-uploads/9347a39c-a8e7-4351-8636-1a08454618b6.png" 
                alt="SportBNK Platform Interface" 
                className="w-full rounded-lg shadow-xl border-4 border-white relative z-10" 
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-sportbnk-green rounded-full"></div>
                  <span className="text-sportbnk-navy font-medium">Live Data</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">360,000+ competitions</p>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-sportbnk-green rounded-full"></div>
                  <span className="text-sportbnk-navy font-medium">Global Coverage</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">110+ sports disciplines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
