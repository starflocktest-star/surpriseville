import React, { useMemo } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { useUserAuth } from '../../contexts/UserAuthContext';

const VendorOrdersPage: React.FC = () => {
    const { orders, updateOrderStatus } = useOrders();
    const { currentUser } = useUserAuth();

    const myOrders = useMemo(() => {
        if (!currentUser) return [];
        return orders.filter(order => order.assignedVendorId === currentUser.id);
    }, [orders, currentUser]);

    const handleCompleteOrder = (orderId: string) => {
        if (window.confirm('Are you sure you want to mark this order as completed? This will trigger the payment process.')) {
            updateOrderStatus(orderId, 'completed');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
            {myOrders.length === 0 ? (
                <p className="text-gray-600">You have no assigned orders at the moment.</p>
            ) : (
                <div className="space-y-4">
                    {myOrders.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <div>
                                    <p className="font-bold">{order.items.map(i => i.product.name).join(', ')}</p>
                                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                                    <p className="text-sm text-gray-500">Customer: {order.userEmail}</p>
                                    <p className="text-sm text-gray-500">Location Pincode: {order.eventPincode}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">₹{order.total.toLocaleString()}</p>
                                    <p className={`text-sm font-semibold capitalize ${order.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                                        Status: {order.status}
                                    </p>
                                </div>
                            </div>
                            {order.status === 'assigned' && (
                                <div className="mt-4 text-right">
                                    <button onClick={() => handleCompleteOrder(order.id)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                                        Mark as Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorOrdersPage;
