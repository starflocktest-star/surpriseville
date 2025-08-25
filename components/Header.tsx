import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserAuth } from '../contexts/UserAuthContext';

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const WishlistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;


const Header: React.FC = () => {
  const { cartItems } = useCart();
  const { currentUser, logout } = useUserAuth();
  const { isAuthenticated: isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };
  
  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left Side: Logo and Location */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-3xl font-bold text-primary">
              Surprise Ville
            </Link>
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <LocationIcon />
              <span className="text-sm">New Delhi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden lg:block flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for gifts, experiences..."
                className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
             <div className="relative" ref={dropdownRef}>
                {currentUser ? (
                    <div onClick={() => setIsDropdownOpen(prev => !prev)} className="flex flex-col items-center cursor-pointer hover:text-primary">
                        <UserIcon />
                        <span className="text-xs hidden md:block truncate max-w-[60px]">{currentUser.name}</span>
                    </div>
                ) : (
                    <Link to="/login" className="flex flex-col items-center cursor-pointer hover:text-primary">
                        <UserIcon />
                        <span className="text-xs hidden md:block">Login</span>
                    </Link>
                )}

                {isDropdownOpen && currentUser && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            Signed in as <br/>
                            <strong className="truncate">{currentUser.email}</strong>
                        </div>
                        <Link to="/account/orders" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                        {isAdminAuthenticated && <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>}
                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                    </div>
                )}
            </div>
            <Link to="/wishlist" className="flex flex-col items-center cursor-pointer hover:text-primary">
              <WishlistIcon />
              <span className="text-xs hidden md:block">Wishlist</span>
            </Link>
            <Link to="/cart" className="relative flex flex-col items-center cursor-pointer hover:text-primary">
              <CartIcon />
              <span className="text-xs hidden md:block">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        {/* Search Bar for mobile */}
        <div className="mt-3 lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for gifts, experiences..."
                className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;