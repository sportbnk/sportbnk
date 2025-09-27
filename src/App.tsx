
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
import { ListsProvider } from "./contexts/ListsContext";
import { RevealProvider } from "./contexts/RevealContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

import Data from "./pages/Data";
import Company from "./pages/Company";

import Pricing from "./pages/Pricing";
import BookDemo from "./pages/BookDemo";
import ContactUs from "./pages/ContactUs";
import FreeTrial from "./pages/FreeTrial";




import Profile from "./pages/crm/Profile";
import CrmSettings from "./pages/crm/Settings";
import Help from "./pages/crm/Help";
import Upgrade from "./pages/crm/Upgrade";

import TeamDetails from "./pages/crm/TeamDetails";
import People from "./pages/crm/People";
import Organisations from "./pages/crm/Organisations";

import SignalsPage from "./pages/crm/SignalsPage";
import ICPs from "./pages/crm/ICPs";
import Search from "./pages/crm/Search";
import Integrations from "./pages/crm/Integrations";
import Enrich from "./pages/crm/Enrich";
import Tasks from "./pages/crm/Tasks";
import Meetings from "./pages/crm/Meetings";
import Emails from "./pages/crm/Emails";
import CrmLayout from "./components/CrmLayout";


// Product pages
import Discover from "./pages/products/Discover";
import ProductEnrich from "./pages/products/Enrich";
import ProductSignals from "./pages/products/Signals";
import Api from "./pages/products/Api";

// Case pages
import Sales from "./pages/cases/Sales";
import Marketing from "./pages/cases/Marketing";
import Hiring from "./pages/cases/Hiring";

// Company sub-pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import LatestNews from "./pages/company/LatestNews";
import ScottMcKecknieArticle from "./pages/company/ScottMcKecknieArticle";

// Resources sub-pages
import Startups from "./pages/resources/Startups";

import Partnership from "./pages/resources/Partnership";
import SportBnkVsSportBankArticle from "./pages/resources/SportBnkVsSportBankArticle";

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
              <ListsProvider>
                <RevealProvider>
                  <HelmetProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      
                      {/* Main menu pages */}
                      
                      <Route path="/data" element={<Data />} />
                      <Route path="/company" element={<Company />} />
                      
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/book-demo" element={<BookDemo />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/free-trial" element={<Navigate to="/auth?tab=signup" replace />} />
                      
                      {/* Protected Routes with Trial Guard */}
                      
                      
                      
                      
                       {/* CRM System - Protected with Trial Guard */}
                       <Route path="/crm/profile" element={<ProtectedRoute><CrmLayout pageTitle="Profile"><Profile /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/settings" element={<ProtectedRoute><CrmLayout pageTitle="Settings"><CrmSettings /></CrmLayout></ProtectedRoute>} />
                       
                       
                       <Route path="/crm/my-contacts" element={<ProtectedRoute><CrmLayout pageTitle="My Contacts"><People /></CrmLayout></ProtectedRoute>} />
                       
                       <Route path="/crm/signals" element={<ProtectedRoute><CrmLayout pageTitle="Signals Feed"><SignalsPage /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/icps" element={<ProtectedRoute><CrmLayout pageTitle="My ICPs"><ICPs /></CrmLayout></ProtectedRoute>} />
                        <Route path="/crm/discover" element={<ProtectedRoute><CrmLayout pageTitle="Discover"><Search /></CrmLayout></ProtectedRoute>} />
                        <Route path="/crm/my-organisations" element={<ProtectedRoute><CrmLayout pageTitle="My Organisations"><Organisations /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/enrich" element={<ProtectedRoute><CrmLayout pageTitle="Data Enrichment"><Enrich /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/tasks" element={<ProtectedRoute><CrmLayout pageTitle="Tasks"><Tasks /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/meetings" element={<ProtectedRoute><CrmLayout pageTitle="Meetings"><Meetings /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/emails" element={<ProtectedRoute><CrmLayout pageTitle="Emails"><Emails /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/integrations" element={<ProtectedRoute><CrmLayout pageTitle="Integrations"><Integrations /></CrmLayout></ProtectedRoute>} />
                       <Route path="/crm/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
                       <Route path="/crm/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
                      
                       {/* Product sub-pages */}
                      <Route path="/products/discover" element={<Discover />} />
                      <Route path="/products/enrich" element={<ProductEnrich />} />
                      <Route path="/products/signals" element={<ProductSignals />} />
                      <Route path="/products/api" element={<Api />} />
                      
                      {/* Case sub-pages */}
                      <Route path="/cases/sales" element={<Sales />} />
                      <Route path="/cases/marketing" element={<Marketing />} />
                      <Route path="/cases/hiring" element={<Hiring />} />
                      
                      {/* Company sub-pages */}
                      <Route path="/company/about" element={<About />} />
                      <Route path="/company/careers" element={<Careers />} />
                      <Route path="/company/latest-news" element={<LatestNews />} />
                      <Route path="/company/news/scott-mckecknie-advisory-shareholder" element={<ScottMcKecknieArticle />} />
                      
                      {/* Resources sub-pages */}
                      <Route path="/resources/startups" element={<Startups />} />
                      
                      <Route path="/resources/articles/sportbnk-vs-sportbank" element={<SportBnkVsSportBankArticle />} />
                      <Route path="/resources/partnership" element={<Partnership />} />
                      
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
                </RevealProvider>
              </ListsProvider>
            </PricingProvider>
          </CreditsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
