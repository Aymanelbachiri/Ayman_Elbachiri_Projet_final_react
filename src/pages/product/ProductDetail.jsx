import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaMinus, FaPlus, FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import productsData from '../../json/products.json';
import images from '../../constants/images';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [expandedSection, setExpandedSection] = useState('description');
    const [showCartAnimation, setShowCartAnimation] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        const foundProduct = productsData.products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(foundProduct.sizes?.[0] || '');
            setSelectedColor(foundProduct.colors?.[0] || '');
        } else {
            navigate('/shop');
        }
    }, [id, navigate]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    // Get product images - use different images for variety
    const productImages = [
        images[product.image] || images.shopi2,
        images.shopy3,
        images.shopy4,
        images.shopy5,
        images.shopy6,
        images.shopy7,
        images.shopy8,
        images.item02
    ];

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        setShowCartAnimation(true);

        const productToAdd = {
            ...product,
            selectedSize,
            selectedColor,
            quantity
        };

        addToCart(productToAdd, quantity);

        // Reset animation after 2 seconds
        setTimeout(() => {
            setShowCartAnimation(false);
            setIsAddingToCart(false);
        }, 2000);
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? '' : section);
    };

    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = [
        { name: 'Gray', value: '#9CA3AF' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Black', value: '#1F2937' }
    ];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Cart Animation Notification */}
            {showCartAnimation && (
                <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right">
                    <div className="flex items-center gap-2">
                        <FaCheck className="animate-bounce" />
                        <span className="font-medium">Product added to cart!</span>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="text-sm text-gray-600">
                        <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate('/')}>
                            Home
                        </span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate('/shop')}>
                            Shop
                        </span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate('/shop')}>
                            {product.category}
                        </span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Product Images */}
                    <div className="lg:col-span-8">
                        <div className="flex gap-4">
                            {/* Thumbnail Images */}
                            <div className="flex flex-col gap-2 w-20">
                                {productImages.slice(0, 8).map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-20 border-2 overflow-hidden ${
                                            selectedImage === index ? 'border-gray-800' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1">
                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                    <img
                                        src={productImages[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8">
                            <h1 className="text-2xl font-medium text-gray-800 mb-4">
                                {product.name}
                            </h1>

                            <div className="text-2xl font-medium text-gray-800 mb-4">
                                ${product.price}
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                            </p>

                            {/* Size Selection */}
                            <div className="mb-6">
                                <div className="flex gap-2 mb-4">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-10 h-10 border text-sm font-medium ${
                                                selectedSize === size
                                                    ? 'bg-red-500 text-white border-red-500'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded border-2 ${
                                                selectedColor === color.name
                                                    ? 'border-gray-800'
                                                    : 'border-gray-300'
                                            }`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex items-center border border-gray-300">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className={`flex-1 py-3 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                        showCartAnimation
                                            ? 'bg-green-600 text-white'
                                            : 'bg-black text-white hover:bg-gray-800'
                                    } ${isAddingToCart ? 'cursor-not-allowed' : ''}`}
                                >
                                    {showCartAnimation ? (
                                        <>
                                            <FaCheck className="animate-bounce" />
                                            ADDED TO CART!
                                        </>
                                    ) : isAddingToCart ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ADDING...
                                        </>
                                    ) : (
                                        'ADD TO CART'
                                    )}
                                </button>
                            </div>

                            {/* Product Meta */}
                            <div className="text-sm text-gray-600 mb-8">
                                <div className="mb-2">
                                    <span className="font-medium">Brand:</span> {product.brand || 'Fashe'}
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">Category:</span> {product.category}
                                </div>
                                <div>
                                    <span className="font-medium">Tags:</span> SHIRT, SLEEVELESS
                                </div>
                            </div>

                            {/* Expandable Sections */}
                            <div className="space-y-4">
                                {/* Description */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('description')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="font-medium">Description</span>
                                        {expandedSection === 'description' ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    {expandedSection === 'description' && (
                                        <div className="pb-4 text-gray-600 text-sm leading-relaxed">
                                            <p className="mb-3">
                                                Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                                            </p>
                                            <p className="mb-3">
                                                Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                                            </p>
                                            <p>
                                                Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Additional Information */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('additional')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="font-medium">Additional Information</span>
                                        {expandedSection === 'additional' ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    {expandedSection === 'additional' && (
                                        <div className="pb-4 text-gray-600 text-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>Weight:</div>
                                                <div>0.5 kg</div>
                                                <div>Dimensions:</div>
                                                <div>60 × 90 × 90 cm</div>
                                                <div>Materials:</div>
                                                <div>Cotton</div>
                                                <div>Care:</div>
                                                <div>Machine wash</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Reviews */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('reviews')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="font-medium">Reviews</span>
                                        {expandedSection === 'reviews' ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    {expandedSection === 'reviews' && (
                                        <div className="pb-4 text-gray-600 text-sm">
                                            <p>No reviews yet. Be the first to review this product!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
