import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    <Link to="/admin">Surprise Ville Admin</Link>
                </div>
                <nav className="mt-6 flex-grow">
                    <ul>
                        <li>
                            <NavLink
                                to="/admin"
                                end
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                Packages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/orders"
                                className={({ isActive }) =>
                                    `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-primary' : ''}`
                                }
                            >
                                Orders
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

export default AdminLayout;