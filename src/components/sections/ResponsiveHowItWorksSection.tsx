import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

const ResponsiveHowItWorksSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Estados dos modais de autenticação
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  // Handle user login success
  useEffect(() => {
    if (user && pendingRedirect) {
      navigate(pendingRedirect);
      setPendingRedirect(null);
      setShowLoginModal(false);
      setShowRegisterModal(false);
    }
  }, [user, pendingRedirect, navigate]);

  const handleCreateAccount = () => {
    navigate('/registration');
  };

  const handleViewPlans = () => {
    navigate('/planos-publicos');
  };

  const handleAddBalance = () => {
    if (user) {
      navigate('/dashboard/adicionar-saldo');
    } else {
      setPendingRedirect('/dashboard/adicionar-saldo');
      setShowLoginModal(true);
    }
  };

  const handleAccessPanels = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setPendingRedirect('/dashboard');
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const steps = [
    {
      number: 1,
      title: "Crie sua conta",
      description: "Faça seu cadastro em menos de 1 minuto com e-mail e senha",
      buttonText: "Criar Conta",
      buttonAction: handleCreateAccount
    },
    {
      number: 2,
      title: "Escolha seu plano",
      description: "Selecione o plano que melhor se adapta às suas necessidades",
      buttonText: "Ver Planos",
      buttonAction: handleViewPlans
    },
    {
      number: 3,
      title: "Pague ou recarregue",
      description: "Assine um plano ou recarregue e economize nas consultas",
      buttonText: "Adicionar Saldo",
      buttonAction: handleAddBalance
    },
    {
      number: 4,
      title: "Faça suas consultas",
      description: "Acesse informações completas em segundos de forma segura",
      buttonText: "Acessar Painéis",
      buttonAction: handleAccessPanels
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-6" data-aos="fade-up" data-aos-duration="500">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            4 passos simples para começar
          </p>
        </div>
        
        {/* Layout horizontal compacto */}
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group rounded-xl p-4 shadow-sm hover:shadow-md border border-border bg-card/90 text-card-foreground backdrop-blur-sm transition-all duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-duration="450"
              data-aos-delay={index * 60}
            >
              {/* Número e título inline */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {step.number}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {step.title}
                </h3>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 flex-grow line-clamp-2">
                {step.description}
              </p>
              
              <Button 
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1.5 h-auto"
                onClick={step.buttonAction}
              >
                {step.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingRedirect(null);
        }}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setPendingRedirect(null);
        }}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </section>
  );
};

export default ResponsiveHowItWorksSection;