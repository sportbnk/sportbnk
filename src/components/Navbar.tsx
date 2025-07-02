import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Package, BarChart3, Building, BookOpen, DollarSign, Calendar, Users, Rocket, Shield, Briefcase, Newspaper, Phone, BookmarkPlus, Users2, FileText, Video, Headphones, Clipboard, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignInDialog } from '@/components/SignInDialog';
import AccountBadge from '@/components/crm/AccountBadge';
import TrialCountdown from '@/components/TrialCountdown';
import { useAuth } from '@/components/auth/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tier } = useCredits();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
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
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/discover" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Package className="h-4 w-4 mr-2" /> Discover
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Explore our product offerings</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/boost" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Rocket className="h-4 w-4 mr-2" /> Boost
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Enhance your sports data</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/products/recruit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Users className="h-4 w-4 mr-2" /> Recruit
                            </div>
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
                      Data
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Building className="h-4 w-4 mr-2" /> About
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Learn about our mission</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company/careers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Briefcase className="h-4 w-4 mr-2" /> Careers
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our team</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company/partner-program" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Shield className="h-4 w-4 mr-2" /> Partner Program
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Collaborate with us</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/company/latest-news" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Newspaper className="h-4 w-4 mr-2" /> Latest News
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Company updates and announcements</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-sportbnk-navy hover:text-sportbnk-green">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/startups" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Rocket className="h-4 w-4 mr-2" /> SportsBnk for Startups
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Resources for growing businesses</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Users2 className="h-4 w-4 mr-2" /> Community
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Join our sports data community</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/articles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <FileText className="h-4 w-4 mr-2" /> Articles
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Latest industry insights</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/webinars" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Video className="h-4 w-4 mr-2" /> Webinars
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Educational video content</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/case-studies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <Clipboard className="h-4 w-4 mr-2" /> Case Studies
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-sportbnk-navy/80">Success stories from our clients</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/resources/help-center" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sportbnk-lightGrey focus:bg-sportbnk-lightGrey">
                            <div className="text-sm font-medium text-sportbnk-navy flex items-center">
                              <HelpCircle className="h-4 w-4 mr-2" /> Help Center
                            </div>
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
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden md:flex items-center space-x-3">
              {!user && <SignInDialog triggerClassName="px-4 py-2 text-sm" />}
              
              <Button 
                className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md items-center"
                asChild
              >
                <Link to="/book-demo">Book A Demo</Link>
              </Button>

              {user && (
                <div className="flex items-center space-x-3">
                  {tier === 'free' ? <TrialCountdown /> : null}
                  <AccountBadge showEmail={false} />
                </div>
              )}
            </div>

            <button 
              className="md:hidden text-sportbnk-navy" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-slideUp">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center">Products</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/products/discover" className="w-full flex items-center">
                    <Package className="h-4 w-4 mr-2" />Discover
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products/boost" className="w-full flex items-center">
                    <Rocket className="h-4 w-4 mr-2" />Boost
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products/recruit" className="w-full flex items-center">
                    <Users className="h-4 w-4 mr-2" />Recruit
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="py-2 w-full">
              <Link to="/data" className="text-sportbnk-navy w-full block flex items-center">
                Data
              </Link>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center">Company</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/company/about" className="w-full flex items-center">
                    <Building className="h-4 w-4 mr-2" />About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company/careers" className="w-full flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />Careers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company/partner-program" className="w-full flex items-center">
                    <Shield className="h-4 w-4 mr-2" />Partner Program
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/company/latest-news" className="w-full flex items-center">
                    <Newspaper className="h-4 w-4 mr-2" />Latest News
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full py-2 text-left text-sportbnk-navy">
                <span className="flex items-center">Resources</span> <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link to="/resources/startups" className="w-full flex items-center">
                    <Rocket className="h-4 w-4 mr-2" />SportsBnk for Startups
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources/community" className="w-full flex items-center">
                    <Users2 className="h-4 w-4 mr-2" />Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources/articles" className="w-full flex items-center">
                    <FileText className="h-4 w-4 mr-2" />Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources/webinars" className="w-full flex items-center">
                    <Video className="h-4 w-4 mr-2" />Webinars
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources/case-studies" className="w-full flex items-center">
                    <Clipboard className="h-4 w-4 mr-2" />Case Studies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/resources/help-center" className="w-full flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />Help Center
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="py-2 w-full">
              <Link to="/pricing" className="text-sportbnk-navy w-full block flex items-center">
                Pricing
              </Link>
            </div>
            
            <div className="flex flex-col space-y-3 mt-4">
              {!user && <SignInDialog triggerClassName="w-full justify-center" />}
              
              <Button 
                className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white rounded-md w-full flex items-center justify-center"
                asChild
              >
                <Link to="/book-demo">Book A Demo</Link>
              </Button>

              {user && (
                <div className="w-full space-y-3">
                  {tier === 'free' && (
                    <div className="flex justify-center">
                      <TrialCountdown />
                    </div>
                  )}
                  <AccountBadge showEmail={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
