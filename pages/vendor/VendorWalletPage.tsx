import React from 'react';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useWallet } from '../../contexts/WalletContext';

const VendorWalletPage: React.FC = () => {
    const { currentUser } = useUserAuth();
    const { getWalletByVendorId } = useWallet();

    const wallet = currentUser ? getWalletByVendorId(currentUser.id) : undefined;
    
    const balance = wallet?.balance || 0;
    const transactions = wallet?.transactions || [];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wallet</h1>
            
            <div className="bg-primary text-white p-6 rounded-lg shadow-lg mb-8 max-w-sm">
                <h2 className="text-lg font-semibold opacity-80">Current Balance</h2>
                <p className="text-4xl font-bold mt-2">₹{balance.toLocaleString()}</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {transactions.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map(txn => (
                                    <tr key={txn.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(txn.date).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.description}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {txn.amount >= 0 ? `+₹${txn.amount.toLocaleString()}` : `-₹${Math.abs(txn.amount).toLocaleString()}`}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="p-6 text-center text-gray-500">No transactions yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorWalletPage;
