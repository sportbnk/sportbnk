
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Benefits = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sportbnk-navy leading-tight">
            Everything you need to sell, scale, and succeed within the sports industry.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to transform how sports organizations leverage data for strategic advantage.
          </p>
          <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white font-medium rounded-md px-8 py-6 text-lg" asChild>
            <Link to="/book-demo">Sign up today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
