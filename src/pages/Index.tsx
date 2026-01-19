
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
      backgroundOpacity="medium" 
      showGradients={true}
      className="flex flex-col"
    >
      <MenuSuperior />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Planos - sem div wrapper */}
      <PublicPlansSection />
      
      {/* Content sections */}
      <div className="w-full">
        {/* Como Funciona - segunda seção */}
        <ResponsiveHowItWorksSection />

        {/* Depoimentos */}
        <Testimonials />
      </div>
      
      <SimpleFooter />
      <SocialMediaButtons />
    </PageLayout>
  );
};

export default Index;
