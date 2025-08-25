import React, { useState } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { Order, CartItem } from '../../types';
import { useVendor } from '../../contexts/VendorContext';

const OrderDetails: React.FC<{ items: CartItem[] }> = ({ items }) => {
    return (
        <div className="bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Order Items:</h4>
            <ul className="space-y-2">
                {items.map(item => (
                    <li key={item.id} className="text-sm text-gray-700 border-b pb-2">
                        <p><span className="font-medium">{item.product.name}</span> (x{item.quantity}) @ ₹{item.unitPrice.toLocaleString()}</p>
                        {Object.keys(item.customizations).length > 0 && (
                             <p className="text-xs pl-2">Customizations: {JSON.stringify(item.customizations)}</p>
                        )}
                         {Object.keys(item.includedItemQuantities).length > 0 && (
                             <p className="text-xs pl-2">Item Qtys: {JSON.stringify(item.includedItemQuantities)}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};


const AdminOrdersPage: React.FC = () => {
    const { orders } = useOrders();
    const { getVendorById } = useVendor();
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleOrderDetails = (orderId: string) => {
        setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-600">No orders have been placed yet.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map(order => {
                                    const vendor = order.assignedVendorId ? getVendorById(order.assignedVendorId) : null;
                                    return (
                                    <React.Fragment key={order.id}>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.date).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userEmail}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor?.email || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{order.status.replace('_', ' ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">₹{order.total.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => toggleOrderDetails(order.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedOrderId === order.id && (
                                            <tr>
                                                <td colSpan={7}>
                                                    <OrderDetails items={order.items} />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
