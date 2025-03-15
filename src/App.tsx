
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Product pages
import Discover from "./pages/products/Discover";
import Boost from "./pages/products/Boost";
import Recruit from "./pages/products/Recruit";

// Company pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import PartnerProgram from "./pages/company/PartnerProgram";
import LatestNews from "./pages/company/LatestNews";

// Resources pages
import Startups from "./pages/resources/Startups";
import Articles from "./pages/resources/Articles";
import Community from "./pages/resources/Community";
import Webinars from "./pages/resources/Webinars";
import Podcasts from "./pages/resources/Podcasts";
import CaseStudies from "./pages/resources/CaseStudies";
import Reviews from "./pages/resources/Reviews";
import HelpCenter from "./pages/resources/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
