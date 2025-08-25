
import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Browse by Occasion</h2>
        <div className="flex justify-center flex-wrap gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm md:text-base font-semibold rounded-full border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
