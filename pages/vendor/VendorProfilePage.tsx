import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useVendor } from '../../contexts/VendorContext';
import { VendorProfile } from '../../types';

const VendorProfilePage: React.FC = () => {
    const { currentUser } = useUserAuth();
    const { updateVendorProfile } = useVendor();
    const [profile, setProfile] = useState<VendorProfile>({
        businessName: '', phone: '', address: '', pincode: '', description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (currentUser?.vendorProfile) {
            setProfile(currentUser.vendorProfile);
        }
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            updateVendorProfile(currentUser.id, profile);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Business Profile</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input type="text" name="businessName" value={profile.businessName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                        <input type="text" name="pincode" value={profile.pincode} onChange={handleChange} maxLength={6} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="address" value={profile.address} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Business Description</label>
                    <textarea name="description" value={profile.description} onChange={handleChange} rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Tell customers about your business..." />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover">Save Changes</button>
                </div>
                {successMessage && <p className="text-green-600 mt-2 text-center">{successMessage}</p>}
            </form>
        </div>
    );
};

export default VendorProfilePage;
