import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, VendorProfile } from '../types';

interface UserAuthContextType {
  currentUser: User | null;
  signup: (name: string, email: string, password: string) => boolean;
  vendorSignup: (name: string, email: string, password: string, businessName: string, phone: string, address: string, pincode: string) => boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// A mock database for users stored in localStorage
const getUsersFromStorage = (): User[] => {
    try {
        const users = localStorage.getItem('site_users');
        return users ? JSON.parse(users) : [];
    } catch (e) {
        return [];
    }
}
const saveUsersToStorage = (users: User[]) => {
    localStorage.setItem('site_users', JSON.stringify(users));
}


export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
        const user = sessionStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch(e) {
        return null;
    }
  });

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    if (users.some(user => user.email === email)) {
        return false; // User already exists
    }
    const newUser: User = { id: `user_${Date.now()}`, name, email, password, role: 'customer' };
    saveUsersToStorage([...users, newUser]);
    return true;
  };
  
  const vendorSignup = (name: string, email: string, password: string, businessName: string, phone: string, address: string, pincode: string): boolean => {
    const users = getUsersFromStorage();
    if (users.some(user => user.email === email)) {
        return false; // User already exists
    }
     const vendorProfile: VendorProfile = {
        businessName, phone, address, pincode, description: ''
    };
    const newUser: User = { 
        id: `vendor_${Date.now()}`, 
        name, 
        email, 
        password, 
        role: 'vendor',
        vendorProfile
    };
    saveUsersToStorage([...users, newUser]);
    return true;
  };

  const login = (email: string, password: string): User | null => {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return user;
    }
    return null;
  };

  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ currentUser, signup, vendorSignup, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
