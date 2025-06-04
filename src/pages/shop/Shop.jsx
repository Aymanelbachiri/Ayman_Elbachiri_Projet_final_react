

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import productsData from '../../json/products.json';
import images from '../../constants/images';

const Shop = () => {
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState(productsData.products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('alphabetically');
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Categories data
    const categories = [
        { name: 'All', count: productsData.products.length },
        { name: 'Best Seller', count: productsData.products.filter(p => p.rating >= 4.5).length },
        { name: 'Featured', count: productsData.products.filter(p => p.isFeatured).length },
        { name: 'Men', count: productsData.products.filter(p =>
            p.category?.toLowerCase().includes('clothing') ||
            p.tags?.some(tag => ['fitness', 'sports'].includes(tag.toLowerCase()))
        ).length },
        { name: 'Women', count: productsData.products.filter(p =>
            p.category?.toLowerCase().includes('clothing') ||
            p.tags?.some(tag => ['yoga', 'organic'].includes(tag.toLowerCase()))
        ).length }
    ];

    // Colors data
    const colors = ['black', 'gray', 'red'];

    // Price ranges
    const priceRanges = [
        { label: '0-20', min: 0, max: 20 },
        { label: '20-40', min: 20, max: 40 }
    ];

    // Sizes
    const sizes = ['L', 'M', 'S', 'XL'];

    // Filter and search products
    useEffect(() => {
        let filtered = productsData.products;

        // Filter by category
        if (selectedCategory !== 'All') {
            // Map category names to product properties
            switch (selectedCategory) {
                case 'Best Seller':
                    filtered = filtered.filter(product => product.rating >= 4.5);
                    break;
                case 'Featured':
                    filtered = filtered.filter(product => product.isFeatured);
                    break;
                case 'Men':
                    filtered = filtered.filter(product =>
                        product.category?.toLowerCase().includes('clothing') ||
                        product.tags?.some(tag => ['fitness', 'sports'].includes(tag.toLowerCase()))
                    );
                    break;
                case 'Women':
                    filtered = filtered.filter(product =>
                        product.category?.toLowerCase().includes('clothing') ||
                        product.tags?.some(tag => ['yoga', 'organic'].includes(tag.toLowerCase()))
                    );
                    break;
                default:
                    filtered = filtered.filter(product => product.category === selectedCategory);
            }
        }

        // Filter by colors
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product => {
                // Check if product has color variants or specifications that match selected colors
                return selectedColors.some(color => {
                    const colorLower = color.toLowerCase();
                    return (
                        product.variants?.some(variant => variant.color?.toLowerCase().includes(colorLower)) ||
                        product.specifications?.color?.toLowerCase().includes(colorLower) ||
                        product.specifications?.colors?.toLowerCase().includes(colorLower) ||
                        (colorLower === 'black' && product.variants?.some(variant => variant.color === 'Black')) ||
                        (colorLower === 'gray' && product.category?.toLowerCase().includes('electronics')) ||
                        (colorLower === 'red' && product.isOnSale)
                    );
                });
            });
        }

        // Filter by price range
        if (selectedPriceRange.length > 0) {
            filtered = filtered.filter(product =>
                selectedPriceRange.some(range =>
                    product.price >= range.min && product.price <= range.max
                )
            );
        }

        // Filter by sizes
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(product => {
                // Check if product has size variants
                return selectedSizes.some(size =>
                    product.variants?.some(variant => variant.size === size) ||
                    product.specifications?.sizes?.includes(size)
                );
            });
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'alphabetically':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
    }, [selectedCategory, selectedColors, selectedPriceRange, selectedSizes, searchTerm, sortBy]);

    // Handle filter changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleColorChange = (color) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const handlePriceRangeChange = (range) => {
        setSelectedPriceRange(prev =>
            prev.some(r => r.label === range.label)
                ? prev.filter(r => r.label !== range.label)
                : [...prev, range]
        );
    };

    const handleSizeChange = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    // Product Card Component
    const ProductCard = ({ product }) => {
        const [isWishlisted, setIsWishlisted] = useState(false);

        const handleProductClick = () => {
            navigate(`/product/${product.id}`);
        };

        const handleWishlistClick = (e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
        };

        return (
            <div className="bg-white group cursor-pointer" onClick={handleProductClick}>
                <div className="relative overflow-hidden">
                    <img
                        src={images[product.image] || images.shopi2}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Sale badge */}
                    {product.isOnSale && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                Sale
                            </span>
                        </div>
                    )}

                    {/* Wishlist button */}
                    <button
                        onClick={handleWishlistClick}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                            isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                    >
                        <FaHeart size={14} />
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2 hover:text-red-500 transition-colors">
                        {product.name}
                    </h3>
                    <div className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0">
                        {/* Categories */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <div key={category.name} className="flex items-center justify-between">
                                        <button
                                            onClick={() => handleCategoryChange(category.name)}
                                            className={`text-left hover:text-red-500 transition-colors ${
                                                selectedCategory === category.name ? 'text-red-500 font-medium' : 'text-gray-600'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                        <span className="text-gray-400 text-sm">({category.count} items)</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">color</h3>
                            <div className="space-y-2">
                                {colors.map(color => (
                                    <label key={color} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedColors.includes(color)}
                                            onChange={() => handleColorChange(color)}
                                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-gray-600 capitalize">{color}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">price</h3>
                            <div className="space-y-2">
                                {priceRanges.map(range => (
                                    <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedPriceRange.some(r => r.label === range.label)}
                                            onChange={() => handlePriceRangeChange(range)}
                                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-gray-600">{range.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">size</h3>
                            <div className="space-y-2">
                                {sizes.map(size => (
                                    <label key={size} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedSizes.includes(size)}
                                            onChange={() => handleSizeChange(size)}
                                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className="text-gray-600">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                >
                                    <option value="alphabetically">Alphabetically, A-Z</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>

                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            <div className="text-gray-600 text-sm">
                                Showing 1 to {Math.min(6, filteredProducts.length)} of {filteredProducts.length} items
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.slice(0, 6).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;