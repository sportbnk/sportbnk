
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
              <img 
                src="/lovable-uploads/9347a39c-a8e7-4351-8636-1a08454618b6.png" 
                alt="SportBNK Platform Screenshots" 
                className="w-full rounded-lg shadow-2xl" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  alt="SportBNK Platform Dashboard" 
                  className="w-full rounded-lg shadow-2xl border-4 border-white" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
