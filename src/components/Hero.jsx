import React, { useState, useEffect } from "react";
import { ChevronRight, ArrowRight } from "react-feather";
import heroBg1 from "../assets/event setup1.jpg";
import heroBg2 from "../assets/stagefabrication.jpg";
import heroBg3 from "../assets/event production2.jpg";
import heroBg4 from "../assets/event production1.jpg";

const Hero = () => {
  const images = [heroBg1, heroBg2, heroBg3, heroBg4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32 sm:px-6 lg:px-8 text-center">
        <div
          className="animate-fade-in-up"
          style={{
            animationDelay: "0.5s",
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="block text-white">Crafting Extraordinary</span>
            <span className="block text-blue-500 mt-1 sm:mt-2">Event Experiences</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed Playfair-Display tracking-wide px-2 sm:px-4">
            Professional Stage Fabrication, Red Carpet Events, and Custom
            Solutions for Unforgettable Moments that leave lasting Impressions.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full text-sm sm:text-base font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
              Explore Our Work
              <ChevronRight className="ml-2" size={16} />
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border border-blue-500/30 text-white rounded-full text-sm sm:text-base font-medium hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center">
              Get in Touch
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;