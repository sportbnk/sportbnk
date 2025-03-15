
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  siteTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
}

const PageLayout = ({ 
  children, 
  pageTitle, 
  siteTitle = "SportsBnk - B2B Sports Intelligence Platform", 
  metaDescription = "B2B Sports Intelligence Platform providing data solutions for the sports industry",
  metaKeywords = "sports data, sports intelligence, B2B sports platform",
  canonicalUrl
}: PageLayoutProps) => {
  // Create the full page title with site name
  const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  // Default canonical URL based on current path
  const defaultCanonicalUrl = typeof window !== 'undefined' ? `https://sportbnk.com${window.location.pathname}` : 'https://sportbnk.com/';
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={canonicalUrl || defaultCanonicalUrl} />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-20">
        {pageTitle && (
          <div className="bg-sportbnk-navy text-white py-16 mt-6">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl font-bold">{pageTitle}</h1>
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
