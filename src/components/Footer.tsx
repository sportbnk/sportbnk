import { Instagram, Linkedin, Cookie } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      console.log('Submitting newsletter email:', email);
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .upsert(
          {
            email: email.trim().toLowerCase(),
            source_page: location.pathname,
          },
          { onConflict: 'email', ignoreDuplicates: true }
        );

      if (error) {
        // Handle duplicate email gracefully
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed!",
            description: "This email is already subscribed to our newsletter.",
            duration: 3000,
          });
        } else {
          throw error;
        }
      } else {
        console.log('Newsletter subscription saved successfully');
        toast({
          title: "Subscription Successful!",
          description: "Thank you for subscribing to our newsletter.",
          duration: 3000,
        });
      }
      
      // Reset the form
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to our newsletter. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
                alt="Sportbnk Logo" 
                className="h-12" 
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Reach decision makers within sport in seconds.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-sportbnk-green transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-sportbnk-green transition-colors">Product</Link></li>
              <li><Link to="/data" className="text-gray-600 hover:text-sportbnk-green transition-colors">Data</Link></li>
              <li><Link to="/company" className="text-gray-600 hover:text-sportbnk-green transition-colors">Company</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-sportbnk-green transition-colors">Resources</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-sportbnk-green transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-sportbnk-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/startups" className="text-gray-600 hover:text-sportbnk-green transition-colors">Sportbnk for Startups</Link></li>
              <li><Link to="/resources/community" className="text-gray-600 hover:text-sportbnk-green transition-colors">Community</Link></li>
              <li><Link to="/resources/articles" className="text-gray-600 hover:text-sportbnk-green transition-colors">Articles</Link></li>
              <li><Link to="/resources/webinars" className="text-gray-600 hover:text-sportbnk-green transition-colors">Webinars</Link></li>
              <li><Link to="/resources/case-studies" className="text-gray-600 hover:text-sportbnk-green transition-colors">Case Studies</Link></li>
              <li><Link to="/resources/help-center" className="text-gray-600 hover:text-sportbnk-green transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Subscribe to Us</h3>
            <form className="flex" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-sportbnk-green"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-sportbnk-green text-white px-4 py-2 rounded-r-md hover:bg-sportbnk-green/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Go"}
              </button>
            </form>
            
            <div className="mt-4">
              <h4 className="font-semibold text-sportbnk-navy mb-2">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div>
            &copy; {new Date().getFullYear()} Sportbnk. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <Link to="/legal/terms" className="flex items-center hover:text-sportbnk-green transition-colors">
              <span>Terms & Conditions</span>
            </Link>
            <Link to="/legal/privacy" className="flex items-center hover:text-sportbnk-green transition-colors">
              <span>Privacy Policy</span>
            </Link>
            <Link to="/legal/cookies" className="flex items-center hover:text-sportbnk-green transition-colors">
              <Cookie size={16} className="mr-1" />
              <span>Cookies</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
