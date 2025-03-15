
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
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center animate-when-visible"
        >
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png" 
              alt="PLAY logo" 
              className="h-16 object-contain"
            />
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/b727ac17-df3d-4270-a031-139c82129d27.png" 
              alt="Ludimos logo" 
              className="h-16 object-contain"
            />
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png" 
              alt="CRICKET.JOBS logo" 
              className="h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
