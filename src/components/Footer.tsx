
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
                alt="Sportbnk Logo" 
                className="h-12" 
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Sports intelligence platform for businesses, connecting data from 750k+ teams and 360k+ competitions.
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
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/startups" className="text-gray-600 hover:text-sportbnk-green transition-colors">Sportbnk for Startups</Link></li>
              <li><Link to="/resources/community" className="text-gray-600 hover:text-sportbnk-green transition-colors">Community</Link></li>
              <li><Link to="/resources/articles" className="text-gray-600 hover:text-sportbnk-green transition-colors">Articles</Link></li>
              <li><Link to="/resources/webinars" className="text-gray-600 hover:text-sportbnk-green transition-colors">Webinars</Link></li>
              <li><Link to="/resources/podcasts" className="text-gray-600 hover:text-sportbnk-green transition-colors">Podcasts</Link></li>
              <li><Link to="/resources/case-studies" className="text-gray-600 hover:text-sportbnk-green transition-colors">Case Studies</Link></li>
              <li><Link to="/resources/reviews" className="text-gray-600 hover:text-sportbnk-green transition-colors">Reviews</Link></li>
              <li><Link to="/resources/help-center" className="text-gray-600 hover:text-sportbnk-green transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sportbnk-navy mb-4">Subscribe to Us</h3>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-sportbnk-green"
              />
              <button 
                type="submit" 
                className="bg-sportbnk-green text-white px-4 py-2 rounded-r-md hover:bg-sportbnk-green/90 transition-colors"
              >
                Go
              </button>
            </form>
            
            <div className="mt-6">
              <h4 className="font-semibold text-sportbnk-navy mb-2">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-sportbnk-green transition-colors">
                  <Twitter size={20} />
                </a>
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
        
        <div className="border-t pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sportbnk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
