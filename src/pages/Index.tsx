
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuSuperior from '@/components/MenuSuperior';
import HeroSection from '@/components/sections/HeroSection';
import PublicPlansSection from '@/components/sections/PublicPlansSection';
import ModulosSection from '@/components/ModulosSection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ResponsiveHowItWorksSection from '@/components/sections/ResponsiveHowItWorksSection';
import PageLayout from '@/components/layout/PageLayout';

import NewsletterForm from '@/components/newsletter/NewsletterForm';
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
  const navigate = useNavigate();

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
        
        {/* Módulos Disponíveis */}
        <ModulosSection />
        
        {/* Depoimentos */}
        <Testimonials />
        
        {/* Newsletter - Compacto */}
        <section className="py-8 sm:py-10 relative overflow-hidden">
          {/* Background sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-blue-500/5 dark:from-brand-purple/10 dark:to-blue-500/10" />
          
          {/* Elementos decorativos */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />

          <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
            {/* Card compacto com glass effect */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700/30 shadow-lg p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Texto */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-lg">📧</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Newsletter
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Receba atualizações sobre novos recursos e dicas da plataforma
                  </p>
                </div>
                
                {/* Formulário */}
                <div className="w-full sm:w-auto sm:min-w-[280px]">
                  <NewsletterForm 
                    source="homepage_newsletter"
                    placeholder="Seu melhor e-mail"
                    buttonText="Inscrever"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <SocialMediaButtons />
    </PageLayout>
  );
};

export default Index;
