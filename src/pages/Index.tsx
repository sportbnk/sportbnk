
import { useEffect } from 'react';
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
  
  return (
    <div className="min-h-screen bg-white">
      <title>SportsBnk - Sports Industry Data Solutions</title>
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
