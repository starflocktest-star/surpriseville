
import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CategoryTabs from '../components/CategoryTabs';
import ProductGrid from '../components/ProductGrid';
import { CATEGORIES } from '../constants';
import { useProducts } from '../contexts/ProductContext';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div>
      <Hero />
      <CategoryTabs 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default HomePage;