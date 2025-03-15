
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import FaviconUpdater from "./components/FaviconUpdater";
import Index from "./pages/Index";
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
import Emails from "./pages/crm/Emails";
import Meetings from "./pages/crm/Meetings";
import Tasks from "./pages/crm/Tasks";
import Calls from "./pages/crm/Calls";
import Teams from "./pages/crm/Teams";
import People from "./pages/crm/People";

// Product pages
import Discover from "./pages/products/Discover";
import Boost from "./pages/products/Boost";
import Recruit from "./pages/products/Recruit";

// Company sub-pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import PartnerProgram from "./pages/company/PartnerProgram";
import LatestNews from "./pages/company/LatestNews";

// Resources sub-pages
import Startups from "./pages/resources/Startups";
import Articles from "./pages/resources/Articles";
import Community from "./pages/resources/Community";
import Webinars from "./pages/resources/Webinars";
import Podcasts from "./pages/resources/Podcasts";
import CaseStudies from "./pages/resources/CaseStudies";
import Reviews from "./pages/resources/Reviews";
import HelpCenter from "./pages/resources/HelpCenter";

// Legal pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Cookies from "./pages/legal/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <FaviconUpdater iconUrl="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Main menu pages */}
            <Route path="/products" element={<Products />} />
            <Route path="/data" element={<Data />} />
            <Route path="/company" element={<Company />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            
            {/* CRM System with sidebar layout */}
            <Route element={<CrmLayout />}>
              <Route path="/database" element={<Navigate to="/crm/people" replace />} />
              <Route path="/crm/database" element={<Navigate to="/crm/people" replace />} />
              <Route path="/database/lists" element={<Lists />} />
              <Route path="/database/emails" element={<Emails />} />
              <Route path="/database/meetings" element={<Meetings />} />
              <Route path="/database/tasks" element={<Tasks />} />
              <Route path="/database/calls" element={<Calls />} />
              <Route path="/crm/teams" element={<Teams />} />
              <Route path="/crm/people" element={<People />} />
            </Route>
            
            {/* Product sub-pages */}
            <Route path="/products/discover" element={<Discover />} />
            <Route path="/products/boost" element={<Boost />} />
            <Route path="/products/recruit" element={<Recruit />} />
            
            {/* Company sub-pages */}
            <Route path="/company/about" element={<About />} />
            <Route path="/company/careers" element={<Careers />} />
            <Route path="/company/partner-program" element={<PartnerProgram />} />
            <Route path="/company/latest-news" element={<LatestNews />} />
            
            {/* Resources sub-pages */}
            <Route path="/resources/startups" element={<Startups />} />
            <Route path="/resources/articles" element={<Articles />} />
            <Route path="/resources/community" element={<Community />} />
            <Route path="/resources/webinars" element={<Webinars />} />
            <Route path="/resources/podcasts" element={<Podcasts />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/reviews" element={<Reviews />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
