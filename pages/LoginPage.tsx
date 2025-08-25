import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, currentUser } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (currentUser) {
       if(currentUser.role === 'vendor') {
         navigate('/vendor/profile');
       } else {
         navigate(from, { replace: true });
       }
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (user) {
       if(user.role === 'vendor') {
         navigate('/vendor/profile');
       } else {
         navigate(from, { replace: true });
       }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 -mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">Login to continue your journey.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-sm space-y-2">
            <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                    Sign up as Customer
                </Link>
            </p>
            <p className="text-gray-600">
                Want to partner with us?{' '}
                <Link to="/vendor/signup" className="font-medium text-primary hover:underline">
                    Sign up as Vendor
                </Link>
            </p>
             <p className="text-gray-500 mt-4">
                Are you an administrator?{' '}
                <Link to="/admin/login" className="font-medium text-indigo-600 hover:underline">
                    Admin Login
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
