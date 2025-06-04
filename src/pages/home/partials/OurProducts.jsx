import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import productsData from '../../../json/products.json';
import images from '../../../constants/images';

const OurProducts = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors'];
    const featuredProducts = productsData.products.slice(0, 8); // Show first 8 products

    const filteredProducts = activeCategory === 'All'
        ? featuredProducts
        : featuredProducts.filter(product => product.category === activeCategory);

    const ProductCard = ({ product }) => {
        const [isWishlisted, setIsWishlisted] = useState(false);
        const { addToCart, isInCart, getItemQuantity } = useCart();

        const discountPercentage = product.originalPrice > product.price
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

        const handleAddToCart = (e) => {
            e.stopPropagation();
            addToCart(product, 1);
        };

        const handleWishlistClick = (e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
        };

        const handleProductClick = () => {
            navigate(`/product/${product.id}`);
        };

        const isProductInCart = isInCart(product.id);
        const itemQuantity = getItemQuantity(product.id);

        return (
            <div
                className="relative group cursor-pointer"
                onClick={handleProductClick}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
            >
                <div className="relative overflow-hidden bg-gray-100">
                    <img
                        src={images.shopi2} // Using placeholder from your constants
                        alt={product.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Sale Badge */}
                    {product.isOnSale && discountPercentage > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                            -{discountPercentage}%
                        </div>
                    )}

                    {/* Hover Actions */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <button
                                onClick={handleWishlistClick}
                                className={`p-2 rounded-full transition-colors duration-200 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'}`}
                            >
                                <FaHeart size={14} />
                            </button>
                            <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-200">
                                <FaEye size={14} />
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-2 px-4 font-medium tracking-wide transition-all duration-300 uppercase text-sm ${
                                    isProductInCart
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                }`}
                                disabled={!product.inStock}
                            >
                                {!product.inStock
                                    ? 'Out of Stock'
                                    : isProductInCart
                                        ? `In Cart (${itemQuantity})`
                                        : 'Add to Cart'
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="pt-4 text-center">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 hover:text-red-500 transition-colors cursor-pointer">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-medium text-gray-900">
                            ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-light tracking-wider uppercase mb-8">Featured Products</h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                                    activeCategory === category
                                        ? 'text-black border-b-2 border-black pb-1'
                                        : 'text-gray-500 hover:text-black'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="bg-transparent border border-black text-black px-8 py-3 font-light tracking-wider hover:bg-black hover:text-white transition-all duration-300 uppercase text-sm">
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OurProducts;