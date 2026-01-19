import React from 'react';
import MenuSuperior from '@/components/MenuSuperior';
import HeroSection from '@/components/sections/HeroSection';
import PublicPlansSection from '@/components/sections/PublicPlansSection';
import Testimonials from '@/components/Testimonials';
import SimpleFooter from '@/components/SimpleFooter';
import ResponsiveHowItWorksSection from '@/components/sections/ResponsiveHowItWorksSection';
import PageLayout from '@/components/layout/PageLayout';
import LandingSection from '@/components/layout/LandingSection';
import SocialMediaButtons from '@/components/SocialMediaButtons';

const Index = () => {
  return (
    <PageLayout
      variant="landing"
      backgroundOpacity="medium"
      showGradients={false}
      className="flex flex-col"
    >
      <MenuSuperior />

      <main className="w-full">
        {/* Hero (sessão inicial) */}
        <LandingSection className="pt-6 sm:pt-10 pb-8 sm:pb-12">
          <HeroSection />
        </LandingSection>

        {/* Planos (vender primeiro) */}
        <LandingSection id="planos" tone="elevated" className="py-8 sm:py-12">
          <PublicPlansSection />
        </LandingSection>

        {/* Como funciona */}
        <LandingSection id="como-funciona" tone="muted" className="py-8 sm:py-12">
          <ResponsiveHowItWorksSection />
        </LandingSection>

        {/* Depoimentos */}
        <LandingSection id="depoimentos" className="py-8 sm:py-12">
          <Testimonials />
        </LandingSection>
      </main>

      <SimpleFooter />
      <SocialMediaButtons />
    </PageLayout>
  );
};

export default Index;
