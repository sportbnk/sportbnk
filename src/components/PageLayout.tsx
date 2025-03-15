
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
  
  // Site navigation structured data for rich results with dropdowns
  const siteNavigationData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SportsBnk",
    "url": "https://sportbnk.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sportbnk.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "Products",
        "url": "https://sportbnk.com/products",
        "hasPart": [
          {
            "@type": "SiteNavigationElement",
            "name": "Discover",
            "url": "https://sportbnk.com/products/discover"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Boost",
            "url": "https://sportbnk.com/products/boost"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Recruit",
            "url": "https://sportbnk.com/products/recruit"
          }
        ]
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Data",
        "url": "https://sportbnk.com/data"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Company",
        "url": "https://sportbnk.com/company",
        "hasPart": [
          {
            "@type": "SiteNavigationElement",
            "name": "About",
            "url": "https://sportbnk.com/company/about"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Careers",
            "url": "https://sportbnk.com/company/careers"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Partner Program",
            "url": "https://sportbnk.com/company/partner-program"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Latest News",
            "url": "https://sportbnk.com/company/latest-news"
          }
        ]
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Resources",
        "url": "https://sportbnk.com/resources",
        "hasPart": [
          {
            "@type": "SiteNavigationElement",
            "name": "Startups",
            "url": "https://sportbnk.com/resources/startups"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Articles",
            "url": "https://sportbnk.com/resources/articles"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Community",
            "url": "https://sportbnk.com/resources/community"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Webinars",
            "url": "https://sportbnk.com/resources/webinars"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Podcasts",
            "url": "https://sportbnk.com/resources/podcasts"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Case Studies",
            "url": "https://sportbnk.com/resources/case-studies"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Reviews",
            "url": "https://sportbnk.com/resources/reviews"
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Help Center",
            "url": "https://sportbnk.com/resources/help-center"
          }
        ]
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Pricing",
        "url": "https://sportbnk.com/pricing"
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={canonicalUrl || defaultCanonicalUrl} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl || defaultCanonicalUrl} />
        <meta property="og:image" content="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" />
        <meta property="og:site_name" content="SportsBnk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png" />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationData)}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="flex-grow">
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
