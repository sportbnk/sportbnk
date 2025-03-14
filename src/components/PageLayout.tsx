
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const PageLayout = ({ children, pageTitle }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Added padding top to ensure content starts below navbar */}
        {pageTitle && (
          <div className="bg-sportbnk-navy text-white py-16 mt-10"> {/* Added margin top for extra space */}
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
