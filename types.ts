import { ReactNode } from 'react';

export interface CustomizationChoice {
  name: string;
  cost: number; // additional cost for this choice
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'select' | 'text';
  choices?: CustomizationChoice[];
  placeholder?: string;
  maxLength?: number;
  costPerCharacter?: number; // for text
}

export interface IncludedItem {
  name: string;
  quantity: number;
  isQuantityCustomizable: boolean;
  costPerUnit?: number; // Cost for each additional unit over the default quantity
}

export type ServiceType = 'package' | 'service' | 'venue';

export interface Product {
  id: number;
  name:string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description: string;
  details: IncludedItem[];
  customizationOptions?: CustomizationOption[];
  serviceType: ServiceType;
}

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface CartItem {
  id: string; // A unique identifier for the cart item, e.g., product.id + JSON.stringify(customizations)
  product: Product;
  quantity: number;
  customizations: { [key: string]: string };
  includedItemQuantities: { [key: string]: number };
  unitPrice: number;
}

export interface VendorProfile {
  businessName: string;
  phone: string;
  address: string;
  pincode: string;
  description: string;
  profilePictureUrl?: string;
}

export interface User {
  id: string;
  email: string;
  password; // In a real app, this would be hashed
  name: string;
  role: 'customer' | 'vendor' | 'admin';
  vendorProfile?: VendorProfile;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  userId: string;
  userEmail: string;
  eventPincode: string;
  status: 'pending_vendor' | 'assigned' | 'completed' | 'cancelled';
  assignedVendorId?: string;
}

export interface PortfolioItem {
  id: string;
  vendorId: string;
  serviceId: number; // Links to the main Product/Service ID
  type: 'image' | 'video';
  url: string; // image data URL or video embed link
}

export interface VendorService {
    vendorId: string;
    serviceId: number; // The product ID they offer
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string; // e.g., "Earnings from Order #123"
}

export interface Wallet {
  vendorId: string;
  balance: number;
  transactions: Transaction[];
}
