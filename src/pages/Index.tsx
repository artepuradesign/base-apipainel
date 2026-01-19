
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
        duration: 700,
        once: false,
        mirror: true,
        offset: 80,
        delay: 0,
        easing: 'ease-out-cubic'
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
      <div data-aos="fade-up" data-aos-duration="650">
        <HeroSection />
      </div>
      
      {/* Planos */}
      <div data-aos="fade-up" data-aos-duration="650" data-aos-delay="80">
        <PublicPlansSection />
      </div>
      
      {/* Content sections */}
      <div className="w-full">
        {/* Como Funciona - segunda seção */}
        <div data-aos="fade-up" data-aos-duration="650">
          <ResponsiveHowItWorksSection />
        </div>

        {/* Depoimentos */}
        <div data-aos="fade-up" data-aos-duration="650">
          <Testimonials />
        </div>
      </div>
      
      <div data-aos="fade-up" data-aos-duration="650">
        <SimpleFooter />
      </div>
      <SocialMediaButtons />
    </PageLayout>
  );
};

export default Index;
