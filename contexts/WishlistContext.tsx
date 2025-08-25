import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useUserAuth } from './UserAuthContext';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { currentUser } = useUserAuth();

  const getWishlistKey = () => currentUser ? `wishlist_${currentUser.id}` : null;

  useEffect(() => {
    const wishlistKey = getWishlistKey();
    if (!wishlistKey) {
      setWishlist([]);
      return;
    }
    try {
      const localData = localStorage.getItem(wishlistKey);
      setWishlist(localData ? JSON.parse(localData) : []);
    } catch (error) {
      console.error("Could not parse wishlist from localStorage", error);
      setWishlist([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const wishlistKey = getWishlistKey();
    if (!wishlistKey) return;
    try {
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Could not save wishlist to localStorage", error);
    }
  }, [wishlist, currentUser]);

  const addToWishlist = (product: Product) => {
    if (!currentUser) return;
    setWishlist(prev => {
        if (!prev.some(item => item.id === product.id)) {
            return [...prev, product];
        }
        return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
