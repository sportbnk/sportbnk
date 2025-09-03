
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const EnhancedCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-sportbnk-navy to-sportbnk-navy/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Join the Waitlist
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Be the first to access our platform when we launch. Transform your sports data strategy with SportBnk.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sportbnk-green focus:border-transparent text-sportbnk-navy"
            />
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-6 py-3 rounded-md whitespace-nowrap">
              Join Waitlist
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
