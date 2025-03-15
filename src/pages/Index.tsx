
import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import TrustedSection from "@/components/TrustedSection";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import CaseStudy from "@/components/CaseStudy";
import Clients from "@/components/Clients";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <PageLayout pageTitle="Home">
      <Helmet>
        <title>SportBnk - B2B Sports Intelligence Platform</title>
        <meta name="description" content="The sports industry is to be an estimated $760 Billion market by 2026. SportBnk provides an intelligence platform for sports organizations to discover, boost, and recruit." />
      </Helmet>
      <Hero />
      <AboutUs />
      <TrustedSection />
      <Features />
      <CaseStudy />
      <Reviews />
      <Clients />
      <CTA />
    </PageLayout>
  );
};

export default Index;
