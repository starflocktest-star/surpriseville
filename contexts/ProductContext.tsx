import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS as initialProducts } from '../constants';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  getProductById: (productId: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const localData = localStorage.getItem('products');
      return localData ? JSON.parse(localData) : initialProducts;
    } catch (error) {
      console.error("Could not parse products from localStorage", error);
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error("Could not save products to localStorage", error);
    }
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    setProducts(prevProducts => {
      const newProduct: Product = {
        ...productData,
        id: Date.now(), // Simple unique ID generation
        rating: 0, // Default value
        reviews: 0, // Default value
      };
      return [...prevProducts, newProduct];
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const getProductById = (productId: number): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};