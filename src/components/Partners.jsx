import React, { useRef } from "react";
import Slider from "react-slick";
import partner1 from "../assets/partner1.jpeg";
import partner2 from "../assets/partner2.jpeg";
import partner3 from "../assets/partner3.png";
import { ChevronLeft, ChevronRight } from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partners = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Additional partner logos
  const partners = [
    { image: partner1, name: "Partner 1" },
    { image: partner2, name: "Partner 2" },
    { image: partner3, name: "Partner 3" },
    { image: partner1, name: "Partner 4" },
    { image: partner2, name: "Partner 5" },
    { image: partner3, name: "Partner 6" },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle background pattern - laser-cut inspired */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97l-1.414 1.415L0 36.485v-2.83zm0 5.657L8.485 47.8l-1.414 1.414L0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.414 1.415L60 36.485v-2.83zm0 5.657L51.515 47.8l1.414 1.414L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.143l7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%231E429F' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium tracking-wider uppercase mb-4 border border-blue-200">
            OUR PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            We're proud to collaborate with brands who share our commitment to excellence and innovation
          </p>
        </div>

        {/* Custom navigation */}
        <div className="relative px-12">
          {/* Nav buttons */}
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors border border-gray-200 group"
            aria-label="Previous partners"
          >
            <ChevronLeft size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors border border-gray-200 group"
            aria-label="Next partners"
          >
            <ChevronRight size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Partner slider with elegant styling */}
          <div className="py-8">
            <Slider ref={sliderRef} {...settings}>
              {partners.map((partner, index) => (
                <div key={index} className="px-6 focus:outline-none">
                  <div className="bg-white rounded-xl p-6 h-32 flex items-center justify-center shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <img
                      src={partner.image}
                      alt={`${partner.name} Logo`}
                      className="max-h-16 mx-auto filter grayscale hover:grayscale-0 transition-all duration-500"
                      aria-label={partner.name}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        
        {/* Stats banner */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Global Partners" },
            { value: "10+", label: "Industries Served" },
            { value: "200+", label: "Events Produced" },
            { value: "6", label: "Continents" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;