
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FaviconUpdater from './components/FaviconUpdater';

import Home from './pages/Index';
import Dashboard from './pages/UserProfile';
import BookDemo from './pages/BookDemo';
import Pricing from './pages/Pricing';
import Contact from './pages/ContactUs';
import Blog from './pages/resources/Articles';
import BlogPost from './pages/resources/SportBnkVsSportBankArticle';
import FreeTrial from './pages/FreeTrial';
import Crm from './pages/crm/Teams';
import TeamDetails from './pages/crm/TeamDetails';
import Lists from './pages/crm/Lists';
import Settings from './pages/Settings';
import Profile from './pages/UserProfile';
import PasswordReset from './pages/Auth';
import ComingSoon from './pages/Auth';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import NotFound from './pages/NotFound';

import { AuthProvider } from './components/auth/AuthContext';
import { ListsProvider } from './contexts/ListsContext';
import { CreditsProvider } from './contexts/CreditsContext';
import { PricingProvider } from "@/contexts/PricingContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <HelmetProvider>
          <AuthProvider>
            <CreditsProvider>
              <PricingProvider>
                <ListsProvider>
                  <div className="min-h-screen bg-background">
                    <FaviconUpdater />
                    <Toaster />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/book-demo" element={<BookDemo />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/free-trial" element={<FreeTrial />} />
                      <Route path="/crm" element={<Crm />} />
                      <Route path="/crm/team/:teamId" element={<TeamDetails />} />
                      <Route path="/crm/lists" element={<Lists />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/password-reset" element={<PasswordReset />} />
                      <Route path="/coming-soon" element={<ComingSoon />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </ListsProvider>
              </PricingProvider>
            </CreditsProvider>
          </AuthProvider>
        </HelmetProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
