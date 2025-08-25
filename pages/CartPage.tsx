import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { useUserAuth } from '../contexts/UserAuthContext';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { cartItems, removeFromCart, updateItemQuantity, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { currentUser } = useUserAuth();
    const navigate = useNavigate();
    
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    const handleCheckout = () => {
        if (!currentUser) {
            alert('Please login to proceed to checkout.');
            navigate('/login');
            return;
        }

        if (!pincode || !/^\d{6}$/.test(pincode)) {
            setPincodeError('Please enter a valid 6-digit pincode for the event location.');
            return;
        }
        setPincodeError('');

        if (cartItems.length > 0) {
            const orderPlaced = addOrder(cartItems, subtotal, pincode);
            if (orderPlaced) {
                clearCart();
                alert('Your order has been placed successfully and assigned to a local partner!');
                navigate('/account/orders');
            }
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    to="/"
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-colors duration-300"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const renderCustomizations = (item: CartItem) => {
        const customizations = Object.entries(item.customizations)
            .filter(([, value]) => value) // Filter out empty strings
            .map(([key, value]) => {
                const option = item.product.customizationOptions?.find(opt => opt.id === key);
                return option ? { name: option.name, value } : null;
            })
            .filter(Boolean); // Filter out nulls

        const includedItems = Object.entries(item.includedItemQuantities)
            .map(([itemName, quantity]) => {
                const originalItem = item.product.details.find(detail => detail.name === itemName);
                if (originalItem && quantity !== originalItem.quantity) {
                    return { name: itemName, value: `Quantity: ${quantity}` };
                }
                return null;
            })
            .filter(Boolean);

        const allCustomizations = [...customizations, ...includedItems];

        if (allCustomizations.length === 0) return null;

        return (
            <ul className="mt-2 text-xs text-gray-500 space-y-1">
                {allCustomizations.map((custom, index) => (
                    <li key={index}>
                        <span className="font-semibold">{custom!.name}:</span> {custom!.value}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-start bg-white p-4 border rounded-lg shadow-sm">
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                            <div className="flex-1">
                                <h2 className="font-bold text-lg">{item.product.name}</h2>
                                {renderCustomizations(item)}
                                <div className="flex items-center mt-3">
                                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                                    <div className="flex items-center border rounded-md">
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors rounded-l-md" aria-label="Decrease quantity">-</button>
                                        <input
                                            id={`quantity-${item.id}`}
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                                            className="w-12 text-center border-l border-r py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                                            min="1"
                                        />
                                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors rounded-r-md" aria-label="Increase quantity">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹{(item.unitPrice * item.quantity).toLocaleString()}</p>

                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-sm mt-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 border rounded-lg shadow-sm sticky top-28">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="mb-4">
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                Event Pincode
                            </label>
                            <input
                                type="text"
                                id="pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Enter 6-digit pincode"
                                maxLength={6}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                required
                            />
                            {pincodeError && <p className="text-xs text-red-600 mt-1">{pincodeError}</p>}
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-semibold">FREE</span>
                        </div>
                        <div className="border-t my-4"></div>
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover transition-colors duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
