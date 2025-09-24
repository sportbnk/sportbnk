import { Instagram, Linkedin, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { Button } from '@/components/ui/button';

const Footer = () => {

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
              <li><Link to="/pricing" className="text-gray-600 hover:text-sportbnk-green transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/startups" className="text-gray-600 hover:text-sportbnk-green transition-colors">Sportbnk for Startups</Link></li>
              <li><Link to="/resources/community" className="text-gray-600 hover:text-sportbnk-green transition-colors">Community</Link></li>
              <li><Link to="/resources/help-center" className="text-gray-600 hover:text-sportbnk-green transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-sportbnk-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Join Waitlist</h3>
            <WaitlistDialog>
              <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white w-full mb-4">
                Join Waitlist
              </Button>
            </WaitlistDialog>
            
            <div>
              <h4 className="font-semibold text-sportbnk-navy mb-2">Social</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold text-sportbnk-navy mb-2">Opt Out</h4>
                <Link to="/opt-out" className="text-gray-600 hover:text-sportbnk-green transition-colors text-base font-medium">
                  Remove My Data
                </Link>
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
