
import { Helmet } from 'react-helmet-async';
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Benefits from "@/components/Benefits";
import TechnologyStack from "@/components/TechnologyStack";

import EnhancedCTA from "@/components/EnhancedCTA";
import TrustedSection from "@/components/TrustedSection";

const Index = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>SportBnk - B2B Sports Intelligence Platform</title>
        <meta name="description" content="The sports industry is to be an estimated $760 Billion market by 2026. SportBnk provides an intelligence platform for sports organisations to discover, boost, and recruit." />
      </Helmet>
      <Hero />
      <Solutions />
      <Benefits />
      <TrustedSection />
      <TechnologyStack />
      <EnhancedCTA />
    </PageLayout>
  );
};

export default Index;
