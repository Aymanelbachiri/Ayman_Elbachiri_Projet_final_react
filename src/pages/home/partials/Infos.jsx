import React from 'react';
import { FaTruck, FaUndo, FaClock } from 'react-icons/fa';
import images from '../../../constants/images';

const Infos = () => {
    const instagramImages = [
        images.gallery03,
        images.gallery07,
        images.gallery09,
        images.gallery13,
        images.gallery15,
        images.shopi2
    ];

    const infoItems = [
        {
            icon: <FaTruck size={24} />,
            title: "Free Delivery Worldwide",
            description: "Mirum est notare quam littera gothica"
        },
        {
            icon: <FaUndo size={24} />,
            title: "30 Days Return",
            description: "Simply return it within 30 days for an exchange."
        },
        {
            icon: <FaClock size={24} />,
            title: "Store Opening",
            description: "Shop open from Monday to Sunday"
        }
    ];

    return (
        <div className="w-full">
            {/* Instagram Section */}
            <div className="py-16 px-4 text-center bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-light tracking-wider uppercase mb-12">@ Follow Us On Instagram</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {instagramImages.map((image, index) => (
                            <div key={index} className="relative group cursor-pointer overflow-hidden">
                                <img
                                    src={image}
                                    alt={`Instagram ${index + 1}`}
                                    className="w-full h-32 lg:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                        {infoItems.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4 text-gray-600">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-2 tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infos;