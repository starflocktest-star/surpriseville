import React, { useState, useEffect, useMemo } from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useProducts } from '../../contexts/ProductContext';
import { useVendor } from '../../contexts/VendorContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { PortfolioItem } from '../../types';

const PortfolioManager: React.FC<{ vendorId: string, serviceId: number }> = ({ vendorId, serviceId }) => {
    const { getPortfolioForService, addPortfolioItem, removePortfolioItem } = usePortfolio();
    const portfolio = getPortfolioForService(vendorId, serviceId);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                addPortfolioItem({ vendorId, serviceId, type: 'image', url: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="mt-4 pl-4 border-l-4">
            <h4 className="font-semibold text-sm text-gray-600 mb-2">My Portfolio for this Service</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-2">
                {portfolio.map(item => (
                    <div key={item.id} className="relative group">
                        <img src={item.url} alt="Portfolio item" className="w-full h-24 object-cover rounded-md" />
                        <button onClick={() => removePortfolioItem(item.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                    </div>
                ))}
            </div>
             <input type="file" onChange={handleImageUpload} accept="image/*" className="text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
        </div>
    );
};

const VendorServicesPage: React.FC = () => {
    const { currentUser } = useUserAuth();
    const { products } = useProducts();
    const { vendorServices, updateVendorServices } = useVendor();
    const [myServiceIds, setMyServiceIds] = useState<Set<number>>(new Set());
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            const currentServices = vendorServices.filter(vs => vs.vendorId === currentUser.id).map(vs => vs.serviceId);
            setMyServiceIds(new Set(currentServices));
        }
    }, [vendorServices, currentUser]);

    const handleServiceToggle = (serviceId: number) => {
        const newSet = new Set(myServiceIds);
        if (newSet.has(serviceId)) {
            newSet.delete(serviceId);
        } else {
            newSet.add(serviceId);
        }
        setMyServiceIds(newSet);
    };

    const handleSaveChanges = () => {
        if (currentUser) {
            updateVendorServices(currentUser.id, Array.from(myServiceIds));
            setSuccessMessage('Your services have been updated!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const servicesByCategory = useMemo(() => {
        return products.reduce((acc, product) => {
            (acc[product.category] = acc[product.category] || []).push(product);
            return acc;
        }, {} as { [key: string]: typeof products });
    }, [products]);


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-gray-800">My Services & Portfolio</h1>
                 <button onClick={handleSaveChanges} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover">
                    Save Changes
                </button>
            </div>
            {successMessage && <p className="text-green-600 mb-4 text-center bg-green-100 p-2 rounded-md">{successMessage}</p>}
            <div className="space-y-6">
                {Object.entries(servicesByCategory).map(([category, services]) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-gray-700 capitalize border-b pb-2 mb-4">{category}</h2>
                        <div className="space-y-4">
                            {services.map(service => (
                                <div key={service.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id={`service-${service.id}`}
                                            checked={myServiceIds.has(service.id)}
                                            onChange={() => handleServiceToggle(service.id)}
                                            className="h-5 w-5 rounded text-primary focus:ring-primary mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <label htmlFor={`service-${service.id}`} className="font-bold text-gray-900 cursor-pointer">{service.name}</label>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </div>
                                    </div>
                                    {myServiceIds.has(service.id) && currentUser && (
                                        <PortfolioManager vendorId={currentUser.id} serviceId={service.id} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorServicesPage;
