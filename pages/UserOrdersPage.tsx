import React, { useEffect, useMemo } from 'react';
import { useOrders } from '../contexts/OrderContext';
import { useUserAuth } from '../contexts/UserAuthContext';
import { Link } from 'react-router-dom';
import { useVendor } from '../contexts/VendorContext';

const UserOrdersPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { orders } = useOrders();
    const { currentUser } = useUserAuth();
    const { getVendorById } = useVendor();

    const userOrders = useMemo(() => {
        if (!currentUser) return [];
        return orders.filter(order => order.userId === currentUser.id);
    }, [orders, currentUser]);

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'assigned':
                return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">Assigned</span>;
            case 'completed':
                return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">Completed</span>;
            case 'cancelled':
                return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">Cancelled</span>;
            default:
                return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">Pending</span>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">My Orders</h1>

            {userOrders.length === 0 ? (
                 <div className="text-center">
                    <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
                     <Link
                        to="/"
                        className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-colors duration-300"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                    {userOrders.map(order => {
                        const vendor = order.assignedVendorId ? getVendorById(order.assignedVendorId) : null;
                        return (
                            <div key={order.id} className="bg-white p-6 border rounded-lg shadow-sm">
                                <div className="flex justify-between items-start border-b pb-3 mb-3 flex-wrap gap-2">
                                    <div>
                                        <h2 className="font-bold text-lg">Order ID: {order.id}</h2>
                                        <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                        {vendor && <p className="text-sm text-gray-500">Fulfilled by: <span className="font-semibold">{vendor.vendorProfile?.businessName}</span></p>}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-primary">Total: ₹{order.total.toLocaleString()}</p>
                                        {getStatusChip(order.status)}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Items:</h3>
                                    <ul className="space-y-2">
                                        {order.items.map(item => (
                                            <li key={item.id} className="flex items-center text-sm">
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">{item.product.name}</p>
                                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">₹{(item.unitPrice * item.quantity).toLocaleString()}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default UserOrdersPage;
