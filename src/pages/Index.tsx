
import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import TechnologyStack from "@/components/TechnologyStack";
import Reviews from "@/components/Reviews";
import EnhancedCTA from "@/components/EnhancedCTA";
import ChatPopup from "@/components/ChatPopup";

const Index = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>SportBnk - B2B Sports Intelligence Platform</title>
        <meta name="description" content="The sports industry is to be an estimated $760 Billion market by 2026. SportBnk provides an intelligence platform for sports organizations to discover, boost, and recruit." />
      </Helmet>
      <Hero />
      <Solutions />
      <Features />
      <TechnologyStack />
      <Reviews />
      <EnhancedCTA />
      <ChatPopup />
    </PageLayout>
  );
};

export default Index;
