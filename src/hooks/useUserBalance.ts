import { useWalletBalance } from './useWalletBalance';

export const useUserBalance = () => {
  const { balance, loadBalance } = useWalletBalance();
  
  return { 
    totalAvailableBalance: balance.total, 
    calculateTotalAvailableBalance: () => balance.total, 
    loadTotalAvailableBalance: loadBalance 
  };
};