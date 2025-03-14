
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={contentRef}
          className="bg-sportbnk-navy rounded-2xl p-8 md:p-12 text-white animate-when-visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-lg max-w-4xl mx-auto mb-6 text-center leading-relaxed">
            The mission of B2B Sportbnk is creating single space to find sports-data solutions for all
            industries with one click. It's using the most innovative technologies in all environments, focused on providing clients with modern, safe, and necessary datasets for every sport. Our platform includes more than 360,000+ live competitions and more than 750,000+ sports teams all over the world.
          </p>
          <div className="flex justify-center mt-8">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
