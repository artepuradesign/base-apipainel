import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';
import { toast } from "sonner";
import { motion } from "framer-motion";
const Hero = () => {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState<string>("cpf");
  const [documentNumber, setDocumentNumber] = useState<string>("");

  // Verificar se o usuário está logado
  const isAuthenticated = () => {
    return localStorage.getItem("auth_token") !== null;
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se o usuário está logado
    if (!isAuthenticated()) {
      toast.error("É necessário fazer login para realizar consultas", {
        description: "Crie uma conta ou faça login para acessar todos os recursos.",
        action: {
          label: "Entrar",
          onClick: () => navigate('/login')
        },
        cancel: {
          label: "Atualizar",
          onClick: () => {
            // Verificar saldo do usuário
            const authUser = localStorage.getItem('auth_user');
            if (authUser) {
              const user = JSON.parse(authUser);
              const userId = user.id;
              
              // Obter saldos
              const walletBalance = parseFloat(localStorage.getItem(`wallet_balance_${userId}`) || '0');
              const planBalance = parseFloat(localStorage.getItem(`plan_balance_${userId}`) || '0');
              const totalBalance = walletBalance + planBalance;
              
              // Se saldo for 0, fazer logout
              if (totalBalance === 0) {
                console.log('🚫 [HERO] Saldo zerado, fazendo logout...');
                
                // Limpar dados de autenticação
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                localStorage.removeItem('session_token');
                document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                
                toast.success('Saldo atualizado!', {
                  description: 'Sua sessão foi encerrada pois seu saldo é zero.'
                });
                
                // Redirecionar para login
                setTimeout(() => {
                  navigate('/login');
                }, 1000);
              } else {
                toast.success('Saldo atualizado!', {
                  description: `Saldo disponível: R$ ${totalBalance.toFixed(2)}`
                });
              }
            } else {
              toast.info('Saldo atualizado!', {
                description: 'Faça login para ver seu saldo.'
              });
            }
          }
        }
      });
      return;
    }

    // Validar documento
    const cleanDocument = documentNumber.replace(/\D/g, '');
    if (documentType === "cpf" && cleanDocument.length !== 11) {
      toast.error("Por favor, digite um CPF válido");
      return;
    }
    if (documentType === "cnpj" && cleanDocument.length !== 14) {
      toast.error("Por favor, digite um CNPJ válido");
      return;
    }

    // Se estiver logado, redirecionar para a página específica com o documento
    const targetPage = documentType === "cpf" ? "/dashboard/consultar-cpf-puxa-tudo" : "/dashboard/consultar-cnpj";
    navigate(`${targetPage}?query=${encodeURIComponent(documentNumber)}&autoSearch=true`);
  };
  const formatDocument = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    if (documentType === "cpf") {
      // Format as CPF: 000.000.000-00
      if (numericValue.length <= 11) {
        let formattedValue = numericValue;
        if (numericValue.length > 9) {
          formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
        } else if (numericValue.length > 6) {
          formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
        } else if (numericValue.length > 3) {
          formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        }
        return formattedValue;
      }
    } else {
      // Format as CNPJ: 00.000.000/0000-00
      if (numericValue.length <= 14) {
        let formattedValue = numericValue;
        if (numericValue.length > 12) {
          formattedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
        } else if (numericValue.length > 8) {
          formattedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
        } else if (numericValue.length > 5) {
          formattedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5)}`;
        } else if (numericValue.length > 2) {
          formattedValue = `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
        }
        return formattedValue;
      }
    }
    return value;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDocument(e.target.value);
    setDocumentNumber(formatted);
  };
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeInOut"
      }
    }
  };
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
          {/* Left side - Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h1 
              initial="hidden" 
              animate="visible" 
              variants={titleVariants} 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
            >
              Síntese Cadastral
              <br />
              <span className="text-brand-purple dark:text-purple-400">através do CPF ou CNPJ</span>
            </motion.h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto lg:mx-0">
              Ferramenta completa para retorno de Score Serasa e síntese cadastral.
            </p>
            <Button 
              onClick={() => navigate('/planos-publicos')}
              size="sm"
              className="bg-brand-purple hover:bg-brand-darkPurple text-white px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Conheça nossos planos
            </Button>
          </div>

          {/* Right side - Compact Search Card */}
          <div className="w-full lg:w-1/2 max-w-sm mx-auto lg:mx-0">
            <div className="relative">
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-purple-600/10 dark:from-purple-900/20 dark:to-purple-600/20 rounded-2xl blur-xl" />
              
              {/* Main card */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-purple/10 to-purple-600/10 dark:from-purple-900/30 dark:to-purple-800/30 px-4 py-3 border-b border-gray-100/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-purple/20 dark:bg-purple-600/30 flex items-center justify-center">
                      <Search className="w-4 h-4 text-brand-purple dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Consulta Rápida</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">CPF ou CNPJ</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <Tabs defaultValue="cpf" onValueChange={setDocumentType}>
                    <TabsList className="grid w-full grid-cols-2 h-8 p-0.5 bg-gray-100/80 dark:bg-gray-700/80 rounded-lg">
                      <TabsTrigger 
                        value="cpf" 
                        className="text-xs h-7 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                      >
                        CPF
                      </TabsTrigger>
                      <TabsTrigger 
                        value="cnpj" 
                        className="text-xs h-7 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm"
                      >
                        CNPJ
                      </TabsTrigger>
                    </TabsList>
                    
                    <form onSubmit={handleSearch} className="mt-3 space-y-3">
                      <TabsContent value="cpf" className="mt-0">
                        <div className="relative">
                          <Input 
                            id="cpf" 
                            type="text" 
                            placeholder="000.000.000-00" 
                            value={documentNumber} 
                            onChange={handleInputChange} 
                            maxLength={14} 
                            className="pr-9 h-10 text-sm bg-gray-50/80 dark:bg-gray-700/80 border-gray-200/80 dark:border-gray-600/80 rounded-lg focus:ring-2 focus:ring-brand-purple/30"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cnpj" className="mt-0">
                        <div className="relative">
                          <Input 
                            id="cnpj" 
                            type="text" 
                            placeholder="00.000.000/0000-00" 
                            value={documentNumber} 
                            onChange={handleInputChange} 
                            maxLength={18} 
                            className="pr-9 h-10 text-sm bg-gray-50/80 dark:bg-gray-700/80 border-gray-200/80 dark:border-gray-600/80 rounded-lg focus:ring-2 focus:ring-brand-purple/30"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                      </TabsContent>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-9 text-sm font-medium bg-brand-purple hover:bg-brand-darkPurple dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        <Search className="w-3.5 h-3.5 mr-1.5" />
                        Consultar
                      </Button>
                    </form>
                  </Tabs>
                </div>
                
                {/* Footer */}
                <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100/50 dark:border-gray-700/50">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
                    Dados obtidos de fontes oficiais • Consulta de demonstração
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;