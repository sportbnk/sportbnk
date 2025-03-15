
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
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>SportsBnk - B2B Sports Intelligence Platform | Sports Data Solutions</title>
        <meta name="description" content="SportsBnk provides comprehensive sports intelligence solutions for the B2B market. Access data on 360,000+ competitions and 750,000+ teams worldwide." />
        <meta name="keywords" content="sports intelligence platform, sports data solutions, B2B sports data, sports analytics, sports industry database, team data, competition data" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
