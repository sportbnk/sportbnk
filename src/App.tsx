
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import FaviconUpdater from "./components/FaviconUpdater";
import { AuthProvider } from "./components/auth/AuthContext";
import { CreditsProvider } from "./contexts/CreditsContext";
import { ListsProvider } from "./contexts/ListsContext";
import { PricingProvider } from "./contexts/PricingContext";
import { RevealProvider } from '@/contexts/RevealContext';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TrialGuard from "./components/auth/TrialGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Data from "./pages/Data";
import Company from "./pages/Company";
import Resources from "./pages/Resources";
import Pricing from "./pages/Pricing";
import BookDemo from "./pages/BookDemo";
import ContactUs from "./pages/ContactUs";
import FreeTrial from "./pages/FreeTrial";
import ContactDatabase from "./pages/ContactDatabase";
import CrmLayout from "./components/crm/CrmLayout";
import Lists from "./pages/crm/Lists";
import Teams from "./pages/crm/Teams";
import People from "./pages/crm/People";
import TeamDetails from "./pages/crm/TeamDetails";
import Leads from "./pages/crm/Leads";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import SearchResults from "./pages/SearchResults";
import CsvUpload from "./pages/CsvUpload";
import CsvUpdate from "./pages/CsvUpdate";
import Meetings from "./pages/crm/Meetings";

// Product pages
import Discover from "./pages/products/Discover";
import Boost from "./pages/products/Boost";
import Recruit from "./pages/products/Recruit";

// Company sub-pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import PartnerProgram from "./pages/company/PartnerProgram";
import LatestNews from "./pages/company/LatestNews";
import ScottMcKecknieArticle from "./pages/company/ScottMcKecknieArticle";

// Resources sub-pages
import Startups from "./pages/resources/Startups";
import Articles from "./pages/resources/Articles";
import SportBnkVsSportBankArticle from "./pages/resources/SportBnkVsSportBankArticle";
import Community from "./pages/resources/Community";
import Webinars from "./pages/resources/Webinars";
import CaseStudies from "./pages/resources/CaseStudies";
import HelpCenter from "./pages/resources/HelpCenter";

// Legal pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <AuthProvider>
          <CreditsProvider>
            <ListsProvider>
              <PricingProvider>
                <RevealProvider>
                  <HelmetProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      
                      {/* Main menu pages */}
                      <Route path="/products" element={<Products />} />
                      <Route path="/data" element={<Data />} />
                      <Route path="/company" element={<Company />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/book-demo" element={<BookDemo />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/free-trial" element={<Navigate to="/auth?tab=signup" replace />} />
                      
                      {/* Protected Routes with Trial Guard */}
                      <Route path="/profile" element={<ProtectedRoute><TrialGuard><UserProfile /></TrialGuard></ProtectedRoute>} />
                      <Route path="/settings" element={<ProtectedRoute><TrialGuard><Settings /></TrialGuard></ProtectedRoute>} />
                      <Route path="/search" element={<ProtectedRoute><TrialGuard><SearchResults /></TrialGuard></ProtectedRoute>} />
                      <Route path="/csv-upload" element={<ProtectedRoute><TrialGuard><CsvUpload /></TrialGuard></ProtectedRoute>} />
                      <Route path="/csv-update" element={<ProtectedRoute><TrialGuard><CsvUpdate /></TrialGuard></ProtectedRoute>} />
                      
                      {/* CRM System with sidebar layout - Protected with Trial Guard */}
                      <Route element={<ProtectedRoute><TrialGuard><CrmLayout /></TrialGuard></ProtectedRoute>}>
                        <Route path="/database" element={<Navigate to="/crm/teams" replace />} />
                        <Route path="/crm/database" element={<Navigate to="/crm/teams" replace />} />
                        <Route path="/database/lists" element={<Lists />} />
                        <Route path="/crm/teams" element={<Teams />} />
                        <Route path="/crm/teams/:teamId" element={<TeamDetails />} />
                        <Route path="/crm/people" element={<People />} />
                        <Route path="/crm/leads" element={<Leads />} />
                        <Route path="/crm/meetings" element={<Meetings />} />
                      </Route>
                      
                      {/* Product sub-pages */}
                      <Route path="/products/discover" element={<Discover />} />
                      <Route path="/products/boost" element={<Boost />} />
                      <Route path="/products/recruit" element={<Recruit />} />
                      
                      {/* Company sub-pages */}
                      <Route path="/company/about" element={<About />} />
                      <Route path="/company/careers" element={<Careers />} />
                      <Route path="/company/latest-news" element={<LatestNews />} />
                      <Route path="/company/news/scott-mckecknie-advisory-shareholder" element={<ScottMcKecknieArticle />} />
                      
                      {/* Resources sub-pages */}
                      <Route path="/resources/startups" element={<Startups />} />
                      <Route path="/resources/articles" element={<Articles />} />
                      <Route path="/resources/articles/sportbnk-vs-sportbank" element={<SportBnkVsSportBankArticle />} />
                      <Route path="/resources/community" element={<Community />} />
                      <Route path="/resources/webinars" element={<Webinars />} />
                      <Route path="/resources/case-studies" element={<CaseStudies />} />
                      <Route path="/resources/help-center" element={<HelpCenter />} />
                      
                      {/* Legal pages */}
                      <Route path="/legal/privacy" element={<Privacy />} />
                      <Route path="/legal/terms" element={<Terms />} />
                      <Route path="/legal/cookies" element={<Cookies />} />
                      
                      {/* Redirect to root from any sportbnk.com URLs that should go to home */}
                      <Route path="/index" element={<Navigate replace to="/" />} />
                      <Route path="/index.html" element={<Navigate replace to="/" />} />
                      <Route path="/home" element={<Navigate replace to="/" />} />
                      
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </HelmetProvider>
                </RevealProvider>
              </PricingProvider>
            </ListsProvider>
          </CreditsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
