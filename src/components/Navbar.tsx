
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
              alt="Sportbnk Logo" 
              className="h-10"
            />
          </a>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a href="#discover" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sportbnk-lightGrey/50 to-white p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-sportbnk-navy">Discover</div>
                            <p className="text-sm leading-tight text-sportbnk-navy/90">Explore our product offerings</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#boost" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Boost</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Enhance your sports data</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#intent-data" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Intent Data</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Data-driven insights</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#recruit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Recruit</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Find talents in sports</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">Data</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4">
                      <div className="text-lg font-medium mb-2 text-sportbnk-navy">Data</div>
                      <p className="text-sm text-sportbnk-navy/90 mb-4">Learn about our data, how we get our data and compliance</p>
                      <div className="grid gap-3">
                        <NavigationMenuLink asChild>
                          <a href="#data-sources" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Data Sources</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">How we collect our data</p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a href="#compliance" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Compliance</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Our data compliance policies</p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">About</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Learn about our mission</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#careers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Careers</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our team</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#partner-program" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Partner Program</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Collaborate with us</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#latest-news" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Latest News</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Company updates and announcements</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li className="md:col-span-2">
                        <NavigationMenuLink asChild>
                          <a href="#contact-us" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Contact Us</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Get in touch with our team</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#sportbnk-startups" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">SportsBnk for Startups</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Resources for growing businesses</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Community</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our sports data community</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#articles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Articles</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Latest industry insights</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#webinars" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Webinars</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Educational video content</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#podcasts" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Podcasts</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Listen to our sports data discussions</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#case-studies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Case Studies</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Success stories from our clients</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#reviews" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Reviews</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">What our customers say</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#help-center" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Help Centre</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Support and documentation</p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">Pricing</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="text-lg font-medium mb-2 text-sportbnk-navy">Pricing Plans</div>
                      <div className="grid gap-3">
                        <NavigationMenuLink asChild>
                          <a href="#free-trial" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Free Trial</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Try our platform for free</p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a href="#basic" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Basic</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Essential features for small teams</p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a href="#professional" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Professional</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Advanced features for professionals</p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a href="#enterprise" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy">Enterprise</div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Customized solutions for large organizations</p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button className="hidden md:flex bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md">
              Book A Demo
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
                Products <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <a href="#discover" className="w-full">Discover</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#boost" className="w-full">Boost</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#intent-data" className="w-full">Intent Data</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#recruit" className="w-full">Recruit</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                Data <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <a href="#data-sources" className="w-full">Data Sources</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#compliance" className="w-full">Compliance</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                Company <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <a href="#about" className="w-full">About</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#careers" className="w-full">Careers</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#partner-program" className="w-full">Partner Program</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#latest-news" className="w-full">Latest News</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#contact-us" className="w-full">Contact Us</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                Resources <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <a href="#sportbnk-startups" className="w-full">SportsBnk for Startups</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#community" className="w-full">Community</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#articles" className="w-full">Articles</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#webinars" className="w-full">Webinars</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#podcasts" className="w-full">Podcasts</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#case-studies" className="w-full">Case Studies</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#reviews" className="w-full">Reviews</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#help-center" className="w-full">Help Centre</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                Pricing <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <a href="#free-trial" className="w-full">Free Trial</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#basic" className="w-full">Basic</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#professional" className="w-full">Professional</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#enterprise" className="w-full">Enterprise</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md w-full mt-4">
              Book A Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
