
import { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const GoogleReviewCTA = () => {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const googleReviewUrl = "https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review";
  
  const handleReviewClick = () => {
    window.open(googleReviewUrl, "_blank");
    toast({
      title: "Thank you!",
      description: "We appreciate you taking the time to review us.",
      duration: 5000,
    });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-sportbnk-navy mb-2">
            Love our platform? Let others know!
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve and helps other sports organisations discover our solutions.
          </p>
        </div>
        
        <Card className="max-w-md mx-auto shadow-md border-0 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" 
                  alt="SportBnk Logo" 
                  className="h-12 w-auto" 
                />
              </div>
              
              <p className="text-center mb-3 font-medium text-gray-700">
                Rate your experience with SportBnk
              </p>
              
              <div 
                className="flex gap-1 mb-4 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-8 h-8 ${isHovering ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <Button 
                onClick={handleReviewClick}
                className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white w-full flex items-center justify-center gap-2"
              >
                Leave a Google Review
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <p className="mt-4 text-xs text-gray-500 text-center">
                Your feedback on Google helps us grow and improve our services.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoogleReviewCTA;
