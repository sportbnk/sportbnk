
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WaitlistDialog } from '@/components/WaitlistDialog';

const CTA = () => {
  return (
    <section className="py-16 bg-sportbnk-green">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-sportbnk-navy">
          Join the Waitlist
        </h2>
        <WaitlistDialog>
          <Button className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-white px-8 py-6 rounded-md">
            Join Waitlist
          </Button>
        </WaitlistDialog>
        <p className="text-sportbnk-navy mt-4 opacity-80 text-sm">
          www.sportbnk.com | info@sportbnk.com
        </p>
      </div>
    </section>
  );
};

export default CTA;
