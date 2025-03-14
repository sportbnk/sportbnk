
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
            <div className="relative w-[90%] mx-auto">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sportbnk-green/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sportbnk-navy/20 rounded-full blur-2xl"></div>
              
              {/* Main UI screenshot - Teams table */}
              <div className="relative z-10 mb-4 w-[85%] mx-auto">
                <img 
                  src="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
                  alt="SportBNK Teams Table" 
                  className="w-full rounded-lg shadow-xl border border-gray-200" 
                />
              </div>
              
              {/* Contacts table */}
              <div className="relative z-20 -mt-20 ml-16 w-[70%]">
                <img 
                  src="/lovable-uploads/645d8320-b99d-4282-97d7-2639fc82c060.png" 
                  alt="SportBNK Contacts Table" 
                  className="w-full rounded-lg shadow-xl border border-gray-200 transform rotate-3" 
                />
              </div>
              
              {/* Team profile */}
              <div className="relative z-30 -mt-24 -ml-4 w-[65%]">
                <img 
                  src="/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png" 
                  alt="Cricket Ireland Team Profile" 
                  className="w-full rounded-lg shadow-xl border border-gray-200 transform -rotate-6" 
                />
              </div>
              
              <div className="absolute bottom-0 right-0 bg-green-100 p-3 rounded-lg shadow-lg z-40 -translate-y-12 -translate-x-8">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">Revenue</span>
                </div>
                <p className="text-green-700 text-xl font-bold">$2.5M</p>
              </div>
              
              <div className="absolute bottom-0 left-0 bg-blue-100 p-3 rounded-lg shadow-lg z-40 -translate-y-12 translate-x-8">
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
