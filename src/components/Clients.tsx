
import { useEffect, useRef } from 'react';

const Clients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current.classList.add('is-visible');
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
    <section className="py-16 bg-sportbnk-navy">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-16 text-center text-white">
          Trusted By
        </h2>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center animate-when-visible"
        >
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex items-center justify-center h-24">
            <span className="text-white font-bold text-xl">CRICKET+JOBS</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex items-center justify-center h-24">
            <img 
              src="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
              alt="GRIZZLY logo" 
              className="h-16 object-contain"
            />
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex items-center justify-center h-24">
            <span className="text-white font-bold text-xl">Ludimos</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex items-center justify-center h-24">
            <span className="text-white font-bold text-xl">FillSports</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
