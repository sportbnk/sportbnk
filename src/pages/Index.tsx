
import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import NewsletterBanner from "@/components/NewsletterBanner";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Benefits from "@/components/Benefits";
import TechnologyStack from "@/components/TechnologyStack";
import Reviews from "@/components/Reviews";
import EnhancedCTA from "@/components/EnhancedCTA";
import ChatPopup from "@/components/ChatPopup";
import TrustedSection from "@/components/TrustedSection";

const Index = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>SportBnk - B2B Sports Intelligence Platform</title>
        <meta name="description" content="The sports industry is to be an estimated $760 Billion market by 2026. SportBnk provides an intelligence platform for sports organizations to discover, boost, and recruit." />
      </Helmet>
      <NewsletterBanner />
      <Hero />
      <Solutions />
      <TrustedSection />
      <Benefits />
      <TechnologyStack />
      <Reviews />
      <EnhancedCTA />
      <ChatPopup />
    </PageLayout>
  );
};

export default Index;
