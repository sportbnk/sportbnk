
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { WaitlistDialog } from '@/components/WaitlistDialog';

const EnhancedCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-sportbnk-navy to-sportbnk-navy/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Join the Waitlist
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Be the first to access Sportbnk. Power your growth with smarter sports intelligence.
          </p>
          
          <div className="flex justify-center">
            <WaitlistDialog>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white px-8 py-3 rounded-md text-lg">
                Join Waitlist
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCTA;
