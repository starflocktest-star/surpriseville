import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioContextType {
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  removePortfolioItem: (itemId: string) => void;
  getPortfolioForService: (vendorId: string, serviceId: number) => PortfolioItem[];
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const data = localStorage.getItem('portfolio_items');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_items', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  const addPortfolioItem = (itemData: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = { ...itemData, id: `portfolio_${Date.now()}` };
    setPortfolioItems(prev => [...prev, newItem]);
  };
  
  const removePortfolioItem = (itemId: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getPortfolioForService = (vendorId: string, serviceId: number): PortfolioItem[] => {
    return portfolioItems.filter(item => item.vendorId === vendorId && item.serviceId === serviceId);
  };


  return (
    <PortfolioContext.Provider value={{ portfolioItems, addPortfolioItem, removePortfolioItem, getPortfolioForService }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
