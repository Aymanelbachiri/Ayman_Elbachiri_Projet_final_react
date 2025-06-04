import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const CheckoutModal = ({ isOpen, onClose, onComplete, cartItems, total }) => {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Shipping Address
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        
        // Payment Information
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        
        // Order Notes
        orderNotes: ''
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        // Shipping Address
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        // Payment Information
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Card number is invalid';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        else if (formData.cvv.length < 3) newErrors.cvv = 'CVV is invalid';
        if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsProcessing(true);

        // Simulate payment processing
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would typically send the order to your backend
            console.log('Order submitted:', {
                customer: formData,
                items: cartItems,
                total: total
            });

            // Show success message and complete checkout
            alert('Order placed successfully! Thank you for your purchase.');
            onComplete();
        } catch (error) {
            console.error('Checkout error:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData(prev => ({ ...prev, cardNumber: formatted }));
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleExpiryChange = (e) => {
        const formatted = formatExpiryDate(e.target.value);
        setFormData(prev => ({ ...prev, expiryDate: formatted }));
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[61] overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold">Checkout</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                disabled={isProcessing}
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <FaUser className="text-gray-500" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-500" />
                                    Shipping Address
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                    <FaCreditCard className="text-gray-500" />
                                    Payment Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleExpiryChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                maxLength="4"
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                                disabled={isProcessing}
                                            />
                                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                                            disabled={isProcessing}
                                        />
                                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Order Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Order Notes (Optional)
                                </label>
                                <textarea
                                    name="orderNotes"
                                    value={formData.orderNotes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="Any special instructions for your order..."
                                    disabled={isProcessing}
                                />
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Order Summary</h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Items ({cartItems.length}):</span>
                                        <span>${(total - (total * 0.08)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax:</span>
                                        <span>${(total * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    disabled={isProcessing}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutModal;
