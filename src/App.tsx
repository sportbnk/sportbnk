
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import FaviconUpdater from "./components/FaviconUpdater";
import { AuthProvider } from "./components/auth/AuthContext";
import { CreditsProvider } from "./contexts/CreditsContext";
import { PricingProvider } from "./contexts/PricingContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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




import Profile from "./pages/crm/Profile";
import CrmSettings from "./pages/crm/Settings";
import CrmIntegrations from "./pages/crm/Integrations";
import Calls from "./pages/crm/Calls";
import Meetings from "./pages/crm/Meetings";
import Emails from "./pages/crm/Emails";
import Tasks from "./pages/crm/Tasks";
import CrmLayout from "./components/CrmLayout";


// Product pages
import Discover from "./pages/products/Discover";
import Boost from "./pages/products/Boost";
import Recruit from "./pages/products/Recruit";
import Api from "./pages/products/Api";

// Company sub-pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import LatestNews from "./pages/company/LatestNews";
import ScottMcKecknieArticle from "./pages/company/ScottMcKecknieArticle";

// Resources sub-pages
import Startups from "./pages/resources/Startups";
import Articles from "./pages/resources/Articles";
import SportBnkVsSportBankArticle from "./pages/resources/SportBnkVsSportBankArticle";
import Community from "./pages/resources/Community";
import HelpCenter from "./pages/resources/HelpCenter";

// Legal pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";
import OptOut from "./pages/legal/OptOut";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <AuthProvider>
          <CreditsProvider>
            <PricingProvider>
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
                      
                      
                      
                      
                      {/* CRM System - Protected with Trial Guard */}
                      <Route path="/crm/profile" element={<ProtectedRoute><CrmLayout pageTitle="Profile"><Profile /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/settings" element={<ProtectedRoute><CrmLayout pageTitle="Settings"><CrmSettings /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/calls" element={<ProtectedRoute><CrmLayout pageTitle="Calls"><Calls /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/meetings" element={<ProtectedRoute><CrmLayout pageTitle="Meetings"><Meetings /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/emails" element={<ProtectedRoute><CrmLayout pageTitle="Emails"><Emails /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/tasks" element={<ProtectedRoute><CrmLayout pageTitle="Tasks"><Tasks /></CrmLayout></ProtectedRoute>} />
                      <Route path="/crm/integrations" element={<ProtectedRoute><CrmLayout pageTitle="Integrations"><CrmIntegrations /></CrmLayout></ProtectedRoute>} />
                      
                      {/* Product sub-pages */}
                      <Route path="/products/discover" element={<Discover />} />
                      <Route path="/products/boost" element={<Boost />} />
                      <Route path="/products/recruit" element={<Recruit />} />
                      <Route path="/products/api" element={<Api />} />
                      
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
                      <Route path="/resources/help-center" element={<HelpCenter />} />
                      
                      {/* Legal pages */}
                      <Route path="/legal/privacy" element={<Privacy />} />
                      <Route path="/legal/terms" element={<Terms />} />
                      <Route path="/legal/cookies" element={<Cookies />} />
                      <Route path="/opt-out" element={<OptOut />} />
                      
                      {/* Redirect to root from any sportbnk.com URLs that should go to home */}
                      <Route path="/index" element={<Navigate replace to="/" />} />
                      <Route path="/index.html" element={<Navigate replace to="/" />} />
                      <Route path="/home" element={<Navigate replace to="/" />} />
                      
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </HelmetProvider>
              </PricingProvider>
            </CreditsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
