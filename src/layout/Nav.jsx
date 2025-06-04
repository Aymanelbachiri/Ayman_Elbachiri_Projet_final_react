import React, { useState } from 'react';
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaPinterestSquare, FaTwitter, FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';
import images from '../constants/images';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showPromoBanner, setShowPromoBanner] = useState(true);
    const { getCartCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative bg-white">
            {/* Promotional Banner */}
            {showPromoBanner && (
                <div className="bg-red-500 text-white py-3 px-4 text-center relative">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-sm font-medium">
                            20% off everything!
                            <Link
                                to="/shop"
                                className="underline ml-1 hover:no-underline transition-all"
                            >
                                Shop Now
                            </Link>
                        </span>
                        <button
                            onClick={() => setShowPromoBanner(false)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Social Media Bar with Logo */}
            <div className="py-4 px-4 hidden md:block">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-3 items-center">
                        {/* Left - Social Icons */}
                        <div className="flex items-center justify-start gap-5">
                            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaFacebookF size={14} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaTwitter size={14} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaPinterestSquare size={14} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaGooglePlusG size={14} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaInstagram size={14} />
                            </a>
                        </div>

                        {/* Center - Logo */}
                        <div className="flex justify-center">
                            <Link to="/">
                                <img src={images.logo} alt="fashe logo" className="h-8" />
                            </Link>
                        </div>

                        {/* Right - Email, Currency, Icons */}
                        <div className="flex items-center justify-end gap-5">
                            <span className="text-gray-600 text-sm">fashe@example.com</span>
                            <select className="bg-transparent text-gray-600 text-sm border-none outline-none cursor-pointer">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>GBP</option>
                            </select>
                            <Link to="/auth" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaUserCircle size={16} />
                            </Link>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaShoppingCart size={16} />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="w-full py-5 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center">
                        <nav className="flex items-center gap-12">
                            <Link to="/" className="text-sm font-normal tracking-widest uppercase text-gray-700 hover:text-red-500 transition-colors py-2">
                                Home
                            </Link>
                            <Link to="/shop" className="text-sm font-normal tracking-widest uppercase text-gray-700 hover:text-red-500 transition-colors py-2">
                                Shop
                            </Link>
                            <Link to="/blog" className="text-sm font-normal tracking-widest uppercase text-gray-700 hover:text-red-500 transition-colors py-2">
                                Blog
                            </Link>
                            <Link to="/about" className="text-sm font-normal tracking-widest uppercase text-gray-700 hover:text-red-500 transition-colors py-2">
                                About
                            </Link>
                            <Link to="/contact" className="text-sm font-normal tracking-widest uppercase text-gray-700 hover:text-red-500 transition-colors py-2">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center justify-between">
                        {/* Mobile Logo */}
                        <Link to="/">
                            <img src={images.logo} alt="fashe logo" className="h-6" />
                        </Link>

                        {/* Mobile Icons */}
                        <div className="flex items-center gap-4">
                            <Link to="/auth" className="text-gray-600 hover:text-gray-800 transition-colors">
                                <FaUserCircle size={20} />
                            </Link>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaShoppingCart size={20} />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
                    <nav className="py-4">
                        <Link to="/" className="block py-3 px-6 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/shop" className="block py-3 px-6 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Shop
                        </Link>
                        <Link to="/blog" className="block py-3 px-6 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Blog
                        </Link>
                        <Link to="/about" className="block py-3 px-6 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/contact" className="block py-3 px-6 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>
                    </nav>
                </div>
            )}

            {/* Cart Modal */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};

export default Nav;