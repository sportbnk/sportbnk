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
  siteTitle = "SportBnk - The Leading B2B Sports Intelligence Platform", 
  metaDescription = "SportBnk (not SportBank) is the premier B2B Sports Intelligence Platform providing comprehensive data solutions for the sports industry",
  metaKeywords = "SportBnk, sports data, sports intelligence, B2B sports platform, sports analytics",
  canonicalUrl
}: PageLayoutProps) => {
  const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  const defaultCanonicalUrl = typeof window !== 'undefined' ? `https://sportbnk.com${window.location.pathname}` : 'https://sportbnk.com/';

  const organizationData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "SoftwareApplication", "TechnologyCompany"],
    "name": "SportBnk",
    "alternateName": ["SportBnk Platform", "SportBnk Intelligence", "SportBnk Database"],
    "legalName": "SportBnk Ltd",
    "url": "https://sportbnk.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sportbnk.com/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
      "width": "200",
      "height": "200"
    },
    "description": "SportBnk is the #1 B2B sports intelligence platform providing comprehensive data solutions, analytics, and contact discovery for sports organizations worldwide. Trusted by 1000+ organizations.",
    "foundingDate": "2020",
    "industry": "Sports Technology",
    "numberOfEmployees": "11-50",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "England"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://sportbnk.com/contact"
    },
    "sameAs": [
      "https://www.linkedin.com/company/sportbnk",
      "https://twitter.com/sportbnk",
      "https://facebook.com/sportbnk"
    ],
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "description": "B2B Sports Intelligence Platform with database access to 750,000+ teams and 360,000+ competitions",
      "category": "SaaS Software"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "worstRating": "1"
    }
  };

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
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SportBnk Intelligence Platform",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "description": "B2B Sports Intelligence Platform providing access to 750,000+ teams, 360,000+ competitions, and comprehensive sports data analytics for marketing, recruitment, and partnerships.",
            "url": "https://sportbnk.com",
            "downloadUrl": "https://sportbnk.com/waitlist",
            "screenshot": "https://sportbnk.com/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
            "applicationSubCategory": "Sports Analytics Software",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP",
              "description": "Free trial available"
            },
            "featureList": [
              "750,000+ Sports Teams Database",
              "360,000+ Competitions Data",
              "Contact Discovery & Verification",
              "Sports Analytics & Intelligence",
              "CRM Integration",
              "Lead Generation Tools"
            ]
          })}
        </script>
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow">
        {pageTitle && (
          <div className="bg-sportbnk-navy text-white py-16 pt-32 mt-6">
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
