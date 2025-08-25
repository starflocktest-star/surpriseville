import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { useUserAuth } from './UserAuthContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product, 
    quantity: number, 
    customizations: { [key: string]: string }, 
    unitPrice: number, 
    includedItemQuantities: { [key: string]: number }
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { currentUser } = useUserAuth();
  
  const getCartKey = () => currentUser ? `cartItems_${currentUser.id}` : null;

  // Load cart from localStorage when user logs in or on initial load
  useEffect(() => {
    const cartKey = getCartKey();
    if (!cartKey) {
      setCartItems([]); // Clear cart if no user
      return;
    }
    try {
      const localData = localStorage.getItem(cartKey);
      setCartItems(localData ? JSON.parse(localData) : []);
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      setCartItems([]);
    }
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey();
    if (!cartKey) return; // Don't save if no user
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error)
 {
      console.error("Could not save cart items to localStorage", error);
    }
  }, [cartItems, currentUser]);

  const addToCart = (
    product: Product, 
    quantity: number, 
    customizations: { [key: string]: string }, 
    unitPrice: number,
    includedItemQuantities: { [key: string]: number }
  ) => {
    if (!currentUser) return; // Should be handled by UI, but as a safeguard.
    setCartItems(prevItems => {
      // Create a unique ID based on product ID and all customizations
      const cartItemId = `${product.id}-${JSON.stringify(customizations)}-${JSON.stringify(includedItemQuantities)}`;
      
      const existingItem = prevItems.find(item => item.id === cartItemId);

      if (existingItem) {
        // If the exact same configuration exists, just increase the quantity
        return prevItems.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Otherwise, add as a new item
        return [...prevItems, { id: cartItemId, product, quantity, customizations, unitPrice, includedItemQuantities }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};