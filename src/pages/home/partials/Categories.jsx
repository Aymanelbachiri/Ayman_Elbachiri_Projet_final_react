import React from 'react';
import images from '../../../constants/images';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Dresses",
            image: images.cards1,
            link: "/shop?category=Clothing"
        },
        {
            id: 2,
            name: "Sunglasses",
            image: images.cards4,
            link: "/shop?category=Accessories"
        },
        {
            id: 3,
            name: "Watches",
            image: images.cards2,
            link: "/shop?category=Accessories"
        },
        {
            id: 4,
            name: "Footerwear",
            image: images.cards3,
            link: "/shop?category=Shoes"
        },
        {
            id: 5,
            name: "Bags",
            image: images.cards5,
            link: "/shop?category=Accessories"
        },
        {
            id: 6,
            name: "Accessories",
            image: images.cards6,
            link: "/shop?category=Accessories"
        }
    ];

    return (
        <div className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative group cursor-pointer overflow-hidden"
                        >
                            <div className="relative h-64 lg:h-80">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>

                                {/* Category Label */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-white px-6 py-2 text-center">
                                        <h3 className="text-sm font-medium tracking-wider uppercase text-black">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;