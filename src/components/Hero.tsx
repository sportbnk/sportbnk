
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
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6 max-w-xl">
            <div className="flex items-center mb-2">
              <img src="/lovable-uploads/0f03f161-1515-4345-a85a-b662e12c71bd.png" alt="SportBNK Logo" className="w-20 h-20" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-sportbnk-navy animate-slideUp">
              B2B Sports<br />Intelligence Platform
            </h1>
            <p className="text-lg text-gray-600 animate-slideUp delay-100">
              the sports industry is to be an estimated $760 Billion market by 2026
            </p>
            <div className="pt-4 animate-slideUp delay-200">
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md px-8 py-6 text-lg">
                Book A Demo
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
              
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/0f03f161-1515-4345-a85a-b662e12c71bd.png" 
                  alt="SportBNK Platform Interface" 
                  className="w-full rounded-lg shadow-xl border border-gray-200" 
                />
              </div>
              
              <div className="absolute bottom-0 right-0 bg-green-100 p-3 rounded-lg shadow-lg z-20 -translate-y-12 -translate-x-8">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">Revenue</span>
                </div>
                <p className="text-green-700 text-xl font-bold">$2.5M</p>
              </div>
              
              <div className="absolute bottom-0 left-0 bg-blue-100 p-3 rounded-lg shadow-lg z-20 -translate-y-12 translate-x-8">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-medium">Employees</span>
                </div>
                <p className="text-blue-700 text-xl font-bold">20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
