import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { wishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h1>
                <p className="text-gray-600 mb-8">Explore our products and save your favorites to view them here.</p>
                <Link
                    to="/"
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-colors duration-300"
                >
                    Discover Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
