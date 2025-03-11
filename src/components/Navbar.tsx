
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
              alt="SportBNK Logo" 
              className="h-10"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors">
              Home
            </a>
            <a href="#about" className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors">
              About Us
            </a>
            <a href="#features" className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors">
              Features
            </a>
            <a href="#contact" className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors">
              Contact Us
            </a>
          </nav>

          <Button className="hidden md:flex bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md">
            Get in Touch
          </Button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-sportbnk-navy" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-slideUp">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-base font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors py-2">
              Home
            </a>
            <a href="#about" className="text-base font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors py-2">
              About Us
            </a>
            <a href="#features" className="text-base font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors py-2">
              Features
            </a>
            <a href="#contact" className="text-base font-medium text-sportbnk-navy hover:text-sportbnk-green transition-colors py-2">
              Contact Us
            </a>
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md w-full">
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
