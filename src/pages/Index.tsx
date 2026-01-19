
import React, { useEffect } from 'react';
import MenuSuperior from '@/components/MenuSuperior';
import HeroSection from '@/components/sections/HeroSection';
import PublicPlansSection from '@/components/sections/PublicPlansSection';
import Testimonials from '@/components/Testimonials';
import SimpleFooter from '@/components/SimpleFooter';
import ResponsiveHowItWorksSection from '@/components/sections/ResponsiveHowItWorksSection';
import PageLayout from '@/components/layout/PageLayout';

import SocialMediaButtons from '@/components/SocialMediaButtons';

// Import AOS with type definition
declare global {
  interface Window {
    AOS: {
      init: (params: any) => void;
      refresh: () => void;
    }
  }
}

const Index = () => {

  // Initialize AOS when component mounts
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        once: true,
        offset: 50,
        delay: 0
      });
    }

  }, []);

  // Remover o redirecionamento automático - usuário logado pode navegar pelo site

  return (
    <PageLayout 
      variant="landing" 
      backgroundOpacity="light" 
      showGradients={false}
      className="flex flex-col"
    >
      <MenuSuperior />

      <main className="w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Planos */}
        <PublicPlansSection />

        {/* Como funciona + Depoimentos */}
        <section className="w-full">
          <ResponsiveHowItWorksSection />
          <Testimonials />
        </section>
      </main>

      <SimpleFooter />
      <SocialMediaButtons />
    </PageLayout>
  );
};

export default Index;
