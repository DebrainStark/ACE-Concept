import React from "react";
import Slider from "react-slick";
import partner1 from "../assets/partner1.jpeg";
import partner2 from "../assets/partner2.jpeg";
import partner3 from "../assets/partner3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative bg-black py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-black to-blue-900/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="text-3xl font-bold text-white text-center mb-8">
          Trusted by <span className="text-blue-500">Our Partners</span>
        </h4>
        <Slider {...settings}>
          <div className="p-4">
            <img
              src={partner1}
              alt="Partner 1 Logo"
              className="h-16 mx-auto transform hover:scale-110 transition-transform duration-300"
              aria-label="Partner 1"
            />
          </div>
          <div className="p-4">
            <img
              src={partner2}
              alt="Partner 2 Logo"
              className="h-16 mx-auto transform hover:scale-110 transition-transform duration-300"
              aria-label="Partner 2"
            />
          </div>
          <div className="p-4">
            <img
              src={partner3}
              alt="Partner 3 Logo"
              className="h-16 mx-auto transform hover:scale-110 transition-transform duration-300"
              aria-label="Partner 3"
            />
          </div>
          {/* Add more partner logos as needed */}
        </Slider>
      </div>
    </div>
  );
};

export default Partners;
