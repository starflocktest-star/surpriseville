import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, VendorService, VendorProfile } from '../types';

interface VendorContextType {
  vendors: User[];
  vendorServices: VendorService[];
  updateVendorProfile: (vendorId: string, profile: VendorProfile) => void;
  updateVendorServices: (vendorId: string, serviceIds: number[]) => void;
  findVendorsForServiceAndPincode: (serviceId: number, pincode: string) => User[];
  getVendorById: (vendorId: string) => User | undefined;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // We source vendors from the main user list for simplicity
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
        const users = localStorage.getItem('site_users');
        return users ? JSON.parse(users) : [];
    } catch (e) { return []; }
  });

  const vendors = allUsers.filter(u => u.role === 'vendor');
  
  const [vendorServices, setVendorServices] = useState<VendorService[]>(() => {
    try {
      const data = localStorage.getItem('vendor_services');
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    // This effect keeps the component in sync if site_users changes elsewhere
    const handleStorageChange = () => {
       setAllUsers(JSON.parse(localStorage.getItem('site_users') || '[]'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('vendor_services', JSON.stringify(vendorServices));
  }, [vendorServices]);


  const updateVendorProfile = (vendorId: string, profile: VendorProfile) => {
    const allUsers = JSON.parse(localStorage.getItem('site_users') || '[]') as User[];
    const userIndex = allUsers.findIndex(u => u.id === vendorId);
    if (userIndex > -1) {
      allUsers[userIndex].vendorProfile = profile;
      localStorage.setItem('site_users', JSON.stringify(allUsers));
      setAllUsers(allUsers); // Update local state
      
      // Also update current user in session storage if it matches
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
      if (currentUser.id === vendorId) {
          currentUser.vendorProfile = profile;
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  };

  const updateVendorServices = (vendorId: string, serviceIds: number[]) => {
    setVendorServices(prev => {
      const otherVendorServices = prev.filter(vs => vs.vendorId !== vendorId);
      const newServices = serviceIds.map(id => ({ vendorId, serviceId: id }));
      return [...otherVendorServices, ...newServices];
    });
  };

  const findVendorsForServiceAndPincode = (serviceId: number, pincode: string): User[] => {
    const matchingVendorIds = vendorServices
      .filter(vs => vs.serviceId === serviceId)
      .map(vs => vs.vendorId);
    
    // Simple pincode match for now (can be expanded to radius logic)
    return vendors.filter(v => 
        matchingVendorIds.includes(v.id) && 
        v.vendorProfile?.pincode === pincode
    );
  };
  
  const getVendorById = (vendorId: string): User | undefined => {
      return vendors.find(v => v.id === vendorId);
  }

  return (
    <VendorContext.Provider value={{ vendors, vendorServices, updateVendorProfile, updateVendorServices, findVendorsForServiceAndPincode, getVendorById }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};
