import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';

const VendorLayout: React.FC = () => {
    const { logout, currentUser } = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/vendor/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-gray-700">
                    <Link to="/vendor/profile" className="text-xl font-bold">
                        {currentUser?.vendorProfile?.businessName || 'Vendor Panel'}
                    </Link>
                    <p className="text-xs text-gray-400">Business Partner</p>
                </div>
                <nav className="mt-6 flex-grow">
                    <ul>
                        <li>
                            <NavLink
                                to="/vendor/profile"
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/vendor/services"
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                My Services & Portfolio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/vendor/orders"
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/vendor/wallet"
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                Wallet
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700 space-y-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-4 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                    <Link to="/" className="block text-sm text-gray-400 hover:text-white">&larr; Back to Main Site</Link>
                </div>
            </aside>
            <main className="flex-1 p-6 md:p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default VendorLayout;
