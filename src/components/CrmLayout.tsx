import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CrmSidebar } from '@/components/CrmSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface CrmLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const CrmLayout: React.FC<CrmLayoutProps> = ({ children, pageTitle }) => {
  const fullTitle = pageTitle ? `${pageTitle} | SportBnk CRM` : 'SportBnk CRM';

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content="SportBnk CRM Dashboard - Manage your sports industry contacts and relationships" />
          </Helmet>
          
          <CrmSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center justify-between px-6 h-full">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  {pageTitle && (
                    <h1 className="text-xl font-semibold">{pageTitle}</h1>
                  )}
                </div>
              </div>
            </header>
            
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default CrmLayout;