import React, { useState } from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import images from '../constants/images';

const CartModal = ({ isOpen, onClose }) => {
    const { 
        items, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartSubtotal, 
        getCartTax, 
        getCartGrandTotal,
        getCartCount 
    } = useCart();
    
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    if (!isOpen) return null;

    const handleQuantityChange = (cartId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(cartId);
        } else {
            updateQuantity(cartId, newQuantity);
        }
    };

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const handleCheckoutComplete = () => {
        setIsCheckoutOpen(false);
        clearCart();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Cart Modal */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Shopping Cart ({getCartCount()})</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <FaShoppingBag size={48} className="mb-4 text-gray-300" />
                            <p className="text-lg font-medium mb-2">Your cart is empty</p>
                            <p className="text-sm">Add some products to get started</p>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {items.map((item) => (
                                <div key={item.cartId} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                    {/* Product Image */}
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={images.shopi2} // Using placeholder
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm line-clamp-2 mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                                        
                                        {/* Variant Info */}
                                        {item.selectedVariant && (
                                            <p className="text-xs text-gray-500 mb-2">
                                                {item.selectedVariant.size && `Size: ${item.selectedVariant.size}`}
                                                {item.selectedVariant.color && ` • Color: ${item.selectedVariant.color}`}
                                            </p>
                                        )}

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-sm">${item.price}</span>
                                            {item.originalPrice > item.price && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    ${item.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.cartId)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        {/* Totals */}
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${getCartSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax:</span>
                                <span>${getCartTax().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                <span>Total:</span>
                                <span>${getCartGrandTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={clearCart}
                                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onComplete={handleCheckoutComplete}
                cartItems={items}
                total={getCartGrandTotal()}
            />
        </>
    );
};

export default CartModal;
