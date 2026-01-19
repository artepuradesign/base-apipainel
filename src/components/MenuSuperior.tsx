import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Plus, DollarSign, Package, House, ChevronLeft, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeSwitcher from './ThemeSwitcher';
import TextLogo from './TextLogo';
import UserInfo from './UserInfo';
import NotificationIcon from './notifications/NotificationIcon';

import { useAuth } from '@/contexts/AuthContext';
import { useUserBalance } from '@/hooks/useUserBalance';
import { SimpleCounter } from '@/components/ui/simple-counter';
import UserWalletDropdown from '@/components/ui/user-wallet-dropdown';

import SidebarMenu from './dashboard/layout/sidebar/SidebarMenu';
import { createSidebarItems } from './dashboard/layout/sidebarData';
import { usePanelMenus } from '@/hooks/usePanelMenus';
import { ScrollArea } from '@/components/ui/scroll-area';

const MenuSuperior = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, isSupport } = useAuth();
  const { totalAvailableBalance } = useUserBalance();
  const { panelMenus } = usePanelMenus();

  // Verificar se está no dashboard
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      console.log('🔄 [LOGOUT] Iniciando logout via MenuSuperior...');
      
      // Executar signOut do contexto
      await signOut();
      
      // Mostrar toast de sucesso
      toast.success("Logout realizado com sucesso!");
      
      console.log('✅ [LOGOUT] Logout completo, redirecionando para home...');
      
      // Redirecionar para a página inicial
      navigate("/", { replace: true });
      
    } catch (error) {
      console.error('❌ [LOGOUT] Erro no logout:', error);
      // Mesmo com erro, forçar redirecionamento
      navigate("/", { replace: true });
    }
  };

  const handleDashboardNavigation = () => {
    if (user) {
      // Determinar redirecionamento baseado no role do usuário
      const redirectTo = user.user_role === 'suporte' ? '/dashboard/admin' : '/dashboard';
      console.log(`🎯 [NAVIGATION] Redirecionando para: ${redirectTo} (role: ${user.user_role})`);
      navigate(redirectTo);
    }
  };

  const handleAddBalance = () => {
    navigate('/dashboard/adicionar-saldo');
  };

  const formatBrazilianCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Criar itens do sidebar para o menu mobile
  const sidebarItems = user ? createSidebarItems(handleLogout, isSupport, panelMenus) : [];

  // Funções para o menu mobile
  const isSubmenuActive = (subItems?: any[]) => {
    if (!subItems) return false;
    return subItems.some(subItem => location.pathname === subItem.path);
  };

  const handleSubItemClick = (subItem: any) => {
    if (subItem.onClick) {
      subItem.onClick();
    } else if (subItem.path !== '#') {
      navigate(subItem.path);
    }
    setIsMenuOpen(false); // Fechar menu após navegação
  };

  return (
    <TooltipProvider delayDuration={300}>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            {/* Tablet e Desktop - Logo com Theme e Notifications (>=768px) */}
            <div className="hidden md:flex items-center space-x-4">
              <TextLogo to="/" />
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ThemeSwitcher />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alternar tema</p>
                  </TooltipContent>
                </Tooltip>
                {user && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <NotificationIcon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notificações</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

          {/* Mobile - Logo compacto (< 768px) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Logo: ícone + texto para não logados, apenas ícone para logados */}
            <TextLogo to="/" showFullOnMobile={!user} />
            {/* Theme Switcher removido - agora está dentro do UserWalletDropdown */}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Painel de Controle - tablets e desktop (>=768px) quando NÃO estiver no dashboard */}
                {!isDashboardPage && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleDashboardNavigation}
                        className="hidden md:flex items-center bg-gradient-to-r from-brand-purple to-purple-600 text-white shadow-md hover:from-brand-darkPurple hover:to-purple-700"
                      >
                        <House className="mr-2" size={20} />
                        <span className="text-sm font-semibold">Painel de Controle</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ir para o painel de controle</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                
                {/* Link para planos públicos */}
                <Link to="/planos-publicos">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-brand-purple dark:hover:text-purple-400">
                    Planos
                  </Button>
                </Link>
                
                {/* Modern User Wallet Dropdown */}
                <UserWalletDropdown onLogout={handleLogout} />
              </>
            ) : (
              <>
                {/* Link para planos públicos - sempre visível */}
                <Link to="/planos-publicos">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-brand-purple dark:hover:text-purple-400">
                    Planos
                  </Button>
                </Link>
              </>
            )}
            
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-lightPurple hover:text-brand-purple dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-200">
                    Login
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button className="bg-brand-purple hover:bg-brand-darkPurple text-white dark:bg-purple-700 dark:hover:bg-purple-800">
                    Cadastre-se
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile - User Wallet e Menu (< 768px) */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <>
                <UserWalletDropdown onLogout={handleLogout} />
              </>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={toggleMenu} className="p-2 rounded-md text-gray-600 hover:text-brand-purple focus:outline-none dark:text-gray-300 dark:hover:text-purple-400">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Mobile menu (< 768px) */}
      {isMenuOpen && (
        <>
          {/* Dark Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/60 dark:bg-black/80 z-[800]"
            onClick={toggleMenu}
          />
          
          {/* Centered Menu - Apenas Navegação */}
          <div className="md:hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[900] w-[90vw] max-w-md max-h-[80vh]">
            {user ? (
              <div className="h-full flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl relative">
                {/* Botão X Flutuante */}
                <Button
                  onClick={toggleMenu}
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Header */}
                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                    <Menu className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Menu de Navegação
                  </h3>
                </div>

                {/* Scrollable Content */}
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    <SidebarMenu
                      filteredItems={sidebarItems}
                      location={location}
                      collapsed={false}
                      isMobile={true}
                      isTablet={false}
                      setMobileMenuOpen={setIsMenuOpen}
                      isSubmenuActive={isSubmenuActive}
                      handleSubItemClick={handleSubItemClick}
                      setCollapsed={() => {}}
                    />
                    
                    {/* Botão de Logout */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
              ) : (
              /* Menu para usuários não logados - Design Minimalista e Profissional */
              <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
                {/* Botão X */}
                <Button
                  onClick={toggleMenu}
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Conteúdo principal */}
                <div className="w-full px-8 py-10 flex-1 flex flex-col justify-center">
                  {/* Logo e Título */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-brand-purple/10 dark:bg-brand-purple/20 flex items-center justify-center">
                        <Package className="text-brand-purple" size={24} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Bem-vindo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Entre ou crie sua conta
                    </p>
                  </div>
                  
                  {/* Botões de Ação */}
                  <div className="space-y-3 max-w-sm mx-auto w-full">
                    <Link to="/login" onClick={toggleMenu} className="block">
                      <Button 
                        variant="default" 
                        className="w-full h-11 bg-brand-purple hover:bg-brand-darkPurple text-white font-medium"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                    
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">ou</span>
                      </div>
                    </div>
                    
                    <Link to="/registration" onClick={toggleMenu} className="block">
                      <Button 
                        variant="outline"
                        className="w-full h-11 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Criar Conta
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Informação adicional */}
                  <div className="text-center mt-8">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Ao continuar, você concorda com nossos{' '}
                      <Link to="/terms" className="text-brand-purple hover:underline font-medium">
                        termos de uso
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      </header>
    </TooltipProvider>
  );
};

export default MenuSuperior;