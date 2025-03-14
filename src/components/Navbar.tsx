
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Package, BarChart3, Building, BookOpen, DollarSign, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
              alt="Sportbnk Logo" 
              className="h-10"
            />
          </Link>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    <Package className="h-4 w-4 mr-1" /> Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/products" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sportbnk-lightGrey/50 to-white p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-sportbnk-navy">Discover</div>
                            <p className="text-sm leading-tight text-sportbnk-navy/90">Explore our product offerings</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products#boost" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Boost</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Enhance your sports data</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products#intent-data" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Intent Data</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Data-driven insights</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products#recruit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Recruit</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Find talents in sports</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/data"
                      className={navigationMenuTriggerStyle() + " text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green flex items-center"}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" /> Data
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    <Building className="h-4 w-4 mr-1" /> Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company#about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">About</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Learn about our mission</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company#careers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Careers</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our team</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company#partner-program" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Partner Program</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Collaborate with us</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company#latest-news" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Latest News</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Company updates and announcements</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="md:col-span-2">
                        <NavigationMenuLink asChild>
                          <Link to="/company#contact-us" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Contact Us</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Get in touch with our team</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    <BookOpen className="h-4 w-4 mr-1" /> Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#sportbnk-startups" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">SportsBnk for Startups</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Resources for growing businesses</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Community</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our sports data community</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#articles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Articles</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Latest industry insights</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#webinars" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Webinars</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Educational video content</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#podcasts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Podcasts</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Listen to our sports data discussions</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#case-studies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Case Studies</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Success stories from our clients</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#reviews" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Reviews</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">What our customers say</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources#help-center" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Help Centre</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Support and documentation</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/pricing"
                      className={navigationMenuTriggerStyle() + " text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green flex items-center"}
                    >
                      <DollarSign className="h-4 w-4 mr-1" /> Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              className="hidden md:flex bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md items-center"
              onClick={() => window.location.href = '/book-demo'}
            >
              <Calendar className="h-4 w-4 mr-1" /> Book A Demo
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-slideUp">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center"><Package className="h-4 w-4 mr-1" /> Products</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/products" className="w-full">Discover</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products#boost" className="w-full">Boost</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products#intent-data" className="w-full">Intent Data</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products#recruit" className="w-full">Recruit</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="py-2 w-full">
              <Link to="/data" className="text-sportbnk-navy w-full block flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" /> Data
              </Link>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center"><Building className="h-4 w-4 mr-1" /> Company</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/company#about" className="w-full">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company#careers" className="w-full">Careers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company#partner-program" className="w-full">Partner Program</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company#latest-news" className="w-full">Latest News</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company#contact-us" className="w-full">Contact Us</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center"><BookOpen className="h-4 w-4 mr-1" /> Resources</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/resources#sportbnk-startups" className="w-full">SportsBnk for Startups</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#community" className="w-full">Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#articles" className="w-full">Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#webinars" className="w-full">Webinars</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#podcasts" className="w-full">Podcasts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#case-studies" className="w-full">Case Studies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#reviews" className="w-full">Reviews</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources#help-center" className="w-full">Help Centre</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="py-2 w-full">
              <Link to="/pricing" className="text-sportbnk-navy w-full block flex items-center">
                <DollarSign className="h-4 w-4 mr-1" /> Pricing
              </Link>
            </div>
            
            <Button 
              className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md w-full mt-4 flex items-center justify-center"
              onClick={() => {
                window.location.href = '/book-demo';
                setIsMobileMenuOpen(false);
              }}
            >
              <Calendar className="h-4 w-4 mr-1" /> Book A Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
