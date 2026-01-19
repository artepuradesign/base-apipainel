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
    <section className="py-8 md:py-10 bg-gray-50/80 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-6" data-aos="fade-up" data-aos-duration="500">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Como Funciona
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            4 passos simples para começar
          </p>
        </div>
        
        {/* Layout horizontal compacto */}
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay={index * 50}
            >
              {/* Número e título inline */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 bg-brand-purple text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {step.number}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {step.title}
                </h3>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-grow line-clamp-2">
                {step.description}
              </p>
              
              <Button 
                size="sm"
                className="w-full bg-brand-purple hover:bg-brand-darkPurple text-white text-xs py-1.5 h-auto"
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