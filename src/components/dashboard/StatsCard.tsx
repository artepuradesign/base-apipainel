import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Zap, Wallet, Monitor, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDiscount } from '@/utils/planUtils';
import { useApiPanels } from '@/hooks/useApiPanels';
import { useApiModules } from '@/hooks/useApiModules';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useUserBalance } from '@/hooks/useUserBalance';
import { API_BASE_URL } from '@/config/apiConfig';
import { cookieUtils } from '@/utils/cookieUtils';
import { useAuth } from '@/contexts/AuthContext';

interface StatsCardProps {
  consultationHistory: any[];
  currentPlan: string;
  planBalance: number;
  userBalance: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  consultationHistory, 
  currentPlan, 
  planBalance, 
  userBalance 
}) => {
  const { user } = useAuth();
  const { totalAvailableBalance } = useUserBalance();
  
  const {
    discountPercentage, 
    planInfo, 
    subscription,
    isLoading: subscriptionLoading 
  } = useUserSubscription();
  const { panels } = useApiPanels();
  const { modules } = useApiModules();
  
  // Obter plano atual da API (subscription > planInfo > fallback)
  const apiCurrentPlan = subscription?.plan_name || planInfo?.name || 'Pré-Pago';
  
  // Contar painéis ativos da API
  const activePanels = panels.filter(panel => panel.is_active === true);
  
  // Contar módulos ativos da API
  const activeModules = modules.filter(module => module.is_active === true);
  
  const formatBrazilianCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Card className="bg-white/75 dark:bg-gray-800/75 border-gray-200/75 dark:border-gray-700/75 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Estatísticas Gerais
        </CardTitle>
        <CardDescription>
          Detalhes sobre o sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-indigo-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Painéis Disponíveis</span>
            </div>
            <span className="font-semibold text-indigo-600">{activePanels.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Módulos Disponíveis</span>
            </div>
            <span className="font-semibold text-blue-600">{activeModules.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-purple" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Plano Atual</span>
            </div>
            <span className="font-semibold text-brand-purple">
              {subscriptionLoading ? '...' : apiCurrentPlan}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Desconto Ativo</span>
            </div>
            <span className="font-semibold text-green-600">
              {subscriptionLoading ? '...' : `${discountPercentage || getDiscount(apiCurrentPlan) || 0}%`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Saldo Total</span>
            </div>
            <span className="font-semibold text-purple-600">{formatBrazilianCurrency(totalAvailableBalance)}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Link to="/planos-publicos">
            <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple text-white">
              Atualizar Plano
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;