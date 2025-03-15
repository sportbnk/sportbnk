
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import TrustedSection from '@/components/TrustedSection';
import CaseStudies from '@/components/CaseStudy';
import Features from '@/components/Features';
import Reviews from '@/components/Reviews';
import Clients from '@/components/Clients';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Observer for animation
const setupIntersectionObserver = () => {
  const elements = document.querySelectorAll('.animate-when-visible');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  elements.forEach((element) => observer.observe(element));
};

const Index = () => {
  useEffect(() => {
    // Setup observer for animations
    setupIntersectionObserver();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      // Clean up event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SportsBnk",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "B2B Sports Intelligence Platform providing data solutions for the sports industry. Our platform includes more than 360,000+ live competitions and more than 750,000+ sports teams all over the world.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "128"
    }
  };
  
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
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>SportsBnk - B2B Sports Intelligence Platform | Sports Data Solutions</title>
        <meta name="description" content="SportsBnk provides comprehensive sports intelligence solutions for the B2B market. Access data on 360,000+ competitions and 750,000+ teams worldwide." />
        <meta name="keywords" content="sports intelligence platform, sports data solutions, B2B sports data, sports analytics, sports industry database, team data, competition data" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationData)}
        </script>
      </Helmet>
      <Navbar />
      <Hero />
      <AboutUs />
      <TrustedSection />
      <CaseStudies />
      <Features />
      <Reviews />
      <Clients />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
