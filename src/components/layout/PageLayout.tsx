
import React from 'react';
import GlobalAnimatedBackground from './GlobalAnimatedBackground';

import homeBgVideo from "@/assets/home-bg.mp4";

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'landing' | 'dashboard' | 'auth';
  backgroundOpacity?: 'light' | 'medium' | 'strong';
  showGradients?: boolean;
  className?: string;
}

const PageLayout = ({ 
  children, 
  variant = 'default',
  backgroundOpacity = 'medium',
  showGradients = true,
  className = ''
}: PageLayoutProps) => {
  const isDashboard = variant === 'dashboard';
  
  return (
    <div className={`min-h-screen relative ${isDashboard ? 'dashboard-page' : ''} ${className}`}>
      {/* Vídeo de fundo (somente na Home/tema claro) */}
      {variant === 'landing' && (
        <div className="fixed inset-0 -z-30 dark:hidden" aria-hidden="true">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
            <source src={homeBgVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Fundo animado global */}
      <GlobalAnimatedBackground variant={variant} opacity={backgroundOpacity} />

      {/* Degradês opcionais */}
      {showGradients && !isDashboard && (
        <>
          {/* Degradê superior - escuro para transparente */}
          <div className="fixed top-0 left-0 w-full h-96 z-10 site-gradient-top dark:site-gradient-top-dark pointer-events-none"></div>

          {/* Degradê inferior - transparente para escuro */}
          <div className="fixed bottom-0 left-0 w-full h-96 z-10 site-gradient-bottom dark:site-gradient-bottom-dark pointer-events-none"></div>
        </>
      )}

      {/* Conteúdo principal */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
