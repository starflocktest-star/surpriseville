import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Wallet, Transaction } from '../types';

interface WalletContextType {
  wallets: Wallet[];
  getWalletByVendorId: (vendorId: string) => Wallet | undefined;
  addTransaction: (vendorId: string, amount: number, description: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>(() => {
    try {
      const data = localStorage.getItem('vendor_wallets');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vendor_wallets', JSON.stringify(wallets));
  }, [wallets]);

  const getWalletByVendorId = (vendorId: string): Wallet | undefined => {
    return wallets.find(w => w.vendorId === vendorId);
  };
  
  const addTransaction = (vendorId: string, amount: number, description: string) => {
      setWallets(prevWallets => {
          const walletIndex = prevWallets.findIndex(w => w.vendorId === vendorId);
          const newTransaction: Transaction = {
              id: `txn_${Date.now()}`,
              date: new Date().toISOString(),
              amount,
              description,
          };

          if (walletIndex > -1) {
              // Existing wallet
              const updatedWallet = { ...prevWallets[walletIndex] };
              updatedWallet.balance += amount;
              updatedWallet.transactions = [newTransaction, ...updatedWallet.transactions];
              const newWallets = [...prevWallets];
              newWallets[walletIndex] = updatedWallet;
              return newWallets;
          } else {
              // New wallet
              const newWallet: Wallet = {
                  vendorId,
                  balance: amount,
                  transactions: [newTransaction]
              };
              return [...prevWallets, newWallet];
          }
      });
  };

  return (
    <WalletContext.Provider value={{ wallets, getWalletByVendorId, addTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
