
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const EnhancedCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-sportbnk-navy to-sportbnk-navy/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Sports Data Strategy?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join over 500+ sports organisations worldwide who use SportBnk to drive their data-powered decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-6 rounded-md w-full sm:w-auto text-lg flex items-center justify-center gap-2"
              asChild
            >
              <Link to="/book-demo">
                <Calendar className="w-5 h-5" />
                Schedule a Demo
              </Link>
            </Button>
            
            <Button 
              className="bg-white hover:bg-gray-100 text-sportbnk-navy px-8 py-6 rounded-md w-full sm:w-auto text-lg flex items-center justify-center gap-2"
              asChild
            >
              <Link to="/products">
                Explore Solutions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          <p className="text-gray-400 mt-12">
            Contact us: <a href="mailto:info@sportbnk.com" className="text-sportbnk-green hover:underline">info@sportbnk.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCTA;
