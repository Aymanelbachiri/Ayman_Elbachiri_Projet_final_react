import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import images from '../../../constants/images';

const Herosection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: images.carousel1,
      title: "Women Collection 2018",
      subtitle: "New arrivals",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: images.carousel2,
      title: "Women Collection 2018",
      subtitle: "New arrivals",
      buttonText: "Shop Now"
    },
    {
      id: 3,
      image: images.carousel3,
      title: "Women Collection 2018",
      subtitle: "New arrivals",
      buttonText: "Shop Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Main Carousel */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <p className="text-lg md:text-xl mb-4 font-light tracking-wide uppercase">
                  {slide.title}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 tracking-wider">
                  {slide.subtitle}
                </h1>
                <div className="w-16 h-px bg-white mx-auto mb-8"></div>
                <button className="bg-transparent border border-white text-white px-8 py-3 font-light tracking-wider hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Herosection;
