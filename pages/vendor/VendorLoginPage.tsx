import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';

const VendorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, currentUser } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.role === 'vendor') {
      navigate('/vendor/profile');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(email, password);
    if (user && user.role === 'vendor') {
      navigate('/vendor/profile');
    } else if (user && user.role !== 'vendor') {
      setError('This is not a vendor account. Please use the customer login.');
    } else {
      setError('Invalid credentials or not a vendor account.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Surprise Ville</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">Vendor Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Business Email
            </label>
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
              Login
            </button>
          </div>
        </form>
         <div className="text-center text-sm">
            <p>Don't have a vendor account? <Link to="/vendor/signup" className="text-primary hover:underline">Sign up now</Link></p>
            <p className="mt-2"><Link to="/" className="text-indigo-600 hover:underline">&larr; Back to Main Site</Link></p>
        </div>
      </div>
    </div>
  );
};

export default VendorLoginPage;
