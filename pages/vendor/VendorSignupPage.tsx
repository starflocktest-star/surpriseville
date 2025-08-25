import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';

const VendorSignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        businessName: '',
        phone: '',
        address: '',
        pincode: ''
    });
    const [error, setError] = useState('');
    const { vendorSignup, login } = useUserAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { name, email, password, businessName, phone, address, pincode } = formData;
        
        if (!/^\d{6}$/.test(pincode)) {
            setError('Pincode must be 6 digits.');
            return;
        }
        
        const success = vendorSignup(name, email, password, businessName, phone, address, pincode);
        if (success) {
            login(email, password); // Auto-login after signup
            navigate('/vendor/profile');
        } else {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Partner with Us</h1>
                    <p className="mt-2 text-gray-600">Create your Surprise Ville vendor account.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="businessName" placeholder="Business Name" required value={formData.businessName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="name" placeholder="Contact Person Name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="email" type="email" placeholder="Business Email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="address" placeholder="Business Address" required value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                        <input name="pincode" placeholder="Pincode (6 digits)" maxLength={6} required value={formData.pincode} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <div>
                        <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover">
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <p>Already a partner? <Link to="/vendor/login" className="text-primary hover:underline">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default VendorSignupPage;
