
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
          />
           <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded-md">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate text-gray-800">{product.name}</h3>
          <div className="flex items-center my-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
          </div>
          <p className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
