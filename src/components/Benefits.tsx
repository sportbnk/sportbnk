
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WaitlistDialog } from '@/components/WaitlistDialog';

const Benefits = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sportbnk-navy leading-tight">
            Everything you need to sell, scale, and succeed in the sports industry.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our mission is to transform the way sports organisations and their partners use data — turning intelligence into strategic advantage and sustainable growth.
          </p>
          <WaitlistDialog>
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white font-medium rounded-md px-8 py-6 text-lg">
              Join Waitlist
            </Button>
          </WaitlistDialog>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
