import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup, login, currentUser } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = signup(name, email, password);
        if (success) {
            // Automatically log in the user after successful signup
            login(email, password);
            navigate('/');
        } else {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 -mt-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
                    <p className="mt-2 text-gray-600">Join Surprise Ville to start planning your perfect moments.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input id="email-signup" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password-signup" name="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <div>
                        <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
