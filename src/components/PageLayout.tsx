
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  siteTitle?: string; // Added new prop for site title
}

const PageLayout = ({ children, pageTitle, siteTitle = "SportsBnk - B2B Sports Intelligence Platform" }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <title>{siteTitle}</title>
      <Navbar />
      <main className="flex-grow pt-20"> {/* Increased padding top to ensure content starts well below navbar */}
        {pageTitle && (
          <div className="bg-sportbnk-navy text-white py-16 mt-6"> {/* Adjusted margin top */}
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
