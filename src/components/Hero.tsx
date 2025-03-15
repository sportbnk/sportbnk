
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Briefcase, LineChart, Users } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden bg-white text-sportbnk-navy">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="flex flex-col space-y-8 lg:col-span-6">
            {/* Animated badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium transform transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              <span className="flex h-2 w-2 rounded-full bg-sportbnk-green"></span>
              <span className="text-gray-700">The sports industry is forecasted to reach <b>$760 Billion</b> by 2026</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight transition-all duration-700 delay-100 text-sportbnk-navy ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              Turn Sports Data Into 
              <span className="bg-gradient-to-r from-sportbnk-green to-teal-400 bg-clip-text text-transparent"> Strategic Advantage</span>
            </h1>
            
            <p className={`text-xl text-gray-600 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              SportBnk provides a complete intelligence platform for sports organizations to discover opportunities, boost engagement, and recruit top talent.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white font-medium rounded-md px-8 py-6 text-lg" asChild>
                <Link to="/book-demo">Book A Demo</Link>
              </Button>
              <Button className="bg-transparent hover:bg-gray-100 border border-gray-300 text-sportbnk-navy font-medium rounded-md px-8 py-6 text-lg" asChild>
                <Link to="/products" className="flex items-center gap-2">
                  Explore Solutions <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className={`mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-sm text-gray-500 mb-4">Trusted by 500+ sports organizations worldwide</p>
              <div className="flex flex-wrap gap-6 items-center">
                <img src="/lovable-uploads/1d95a70d-8230-4647-9c16-d5c94a124864.png" alt="Client Logo" className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/c5351de4-d54d-424f-99a5-b07ddc3fcc40.png" alt="Client Logo" className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" alt="Client Logo" className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* 3D effect container */}
              <div className="relative perspective-1000">
                {/* Floating elements */}
                <div className="absolute -top-12 -left-12 w-20 h-20 bg-gray-50 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl flex items-center justify-center transform rotate-6 animate-float">
                  <Users className="w-10 h-10 text-sportbnk-green" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gray-50 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl flex items-center justify-center transform -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}>
                  <BarChart2 className="w-12 h-12 text-blue-500" />
                </div>
                <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 w-16 h-16 bg-gray-50 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl flex items-center justify-center rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                  <Briefcase className="w-8 h-8 text-purple-500" />
                </div>
                
                {/* Main dashboard */}
                <div className="relative z-10 transform transition-transform hover:rotate-y-3 hover:rotate-x-2">
                  <div className="p-2 bg-white shadow-xl border border-gray-100 rounded-xl">
                    <img 
                      src="/lovable-uploads/08f9a58b-fe6c-4ee9-9058-d4d13a5cf79e.png" 
                      alt="SportBnk Dashboard" 
                      className="w-full rounded-lg transform transition-all hover:scale-[1.01]" 
                    />
                  </div>
                </div>
                
                {/* Floating stats card */}
                <div className="absolute -bottom-16 -right-12 max-w-[280px] bg-white backdrop-blur-lg border border-gray-200 p-4 rounded-lg shadow-xl transform rotate-2 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-sportbnk-green/10 rounded-lg">
                      <LineChart className="w-8 h-8 text-sportbnk-green" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Growth Metrics</p>
                      <p className="text-sportbnk-navy font-semibold text-lg">+27.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-8 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
