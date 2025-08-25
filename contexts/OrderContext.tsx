import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem } from '../types';
import { useUserAuth } from './UserAuthContext';
import { useVendor } from './VendorContext';
import { useWallet } from './WalletContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, eventPincode: string) => boolean;
  updateOrderStatus: (orderId: string, status: 'completed' | 'cancelled') => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const localData = localStorage.getItem('orders');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse orders from localStorage", error);
      return [];
    }
  });
  
  const { currentUser } = useUserAuth();
  const { findVendorsForServiceAndPincode } = useVendor();
  const { addTransaction } = useWallet();

  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error("Could not save orders to localStorage", error);
    }
  }, [orders]);

  const addOrder = (items: CartItem[], total: number, eventPincode: string): boolean => {
    if (!currentUser) return false;

    // For this multi-vendor system, we'll find a vendor for the first item in the cart.
    // A real system might split orders, but we'll keep it simple.
    const primaryServiceId = items[0].product.id;
    const availableVendors = findVendorsForServiceAndPincode(primaryServiceId, eventPincode);
    
    // Assign to the first available vendor
    const assignedVendor = availableVendors[0];

    if (!assignedVendor) {
        console.error("No vendors found for this service and pincode.");
        alert("We're sorry, but no service providers are available in your area for this service. Please try a different pincode.");
        return false; // Indicate failure
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      total,
      userId: currentUser.id,
      userEmail: currentUser.email,
      eventPincode,
      status: 'assigned', // Directly assign to the vendor
      assignedVendorId: assignedVendor.id,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return true; // Indicate success
  };
  
  const updateOrderStatus = (orderId: string, status: 'completed' | 'cancelled') => {
      setOrders(prevOrders => {
          const orderIndex = prevOrders.findIndex(o => o.id === orderId);
          if (orderIndex === -1) return prevOrders;

          const updatedOrder = { ...prevOrders[orderIndex], status };
          
          // If completed, process payment to vendor's wallet
          if (status === 'completed' && updatedOrder.assignedVendorId) {
              const platformFee = 0.20; // 20% commission
              const earnings = updatedOrder.total * (1 - platformFee);
              addTransaction(updatedOrder.assignedVendorId, earnings, `Earnings from Order #${updatedOrder.id.split('-')[1]}`);
          }
          
          const newOrders = [...prevOrders];
          newOrders[orderIndex] = updatedOrder;
          return newOrders;
      });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
