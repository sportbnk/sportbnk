
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const NewsletterBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setIsVisible(false);
    // Store in localStorage to remember user preference
    localStorage.setItem('newsletterBannerClosed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // Here you would normally send the email to your backend
      toast({
        title: "Subscription Successful!",
        description: "Your 10% discount code has been sent to your email.",
        duration: 3000,
      });
      
      // Hide banner after successful subscription
      setIsVisible(false);
      
      // Store in localStorage to remember user subscription
      localStorage.setItem('newsletterBannerSubscribed', 'true');
      
      // Reset the form
      setEmail("");
    }
  };

  // Don't render if banner has been dismissed
  if (!isVisible) return null;

  return (
    <div className="bg-sportbnk-green text-white py-3 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-3 md:mb-0 text-center md:text-left">
            <p className="font-medium">Subscribe to our newsletter and get 10% off your first order!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-1 rounded-l-md border-0 text-black flex-grow md:flex-grow-0 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-sportbnk-navy text-white px-4 py-1 rounded-r-md hover:bg-sportbnk-navy/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <button 
            onClick={handleClose}
            className="absolute right-2 top-2 md:relative md:right-0 md:top-0 text-white hover:text-gray-200 transition-colors"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
