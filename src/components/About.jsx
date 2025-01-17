import React from "react";
import Aboutusplaceholder from "../assets/event setup.jpg";

const AboutUs = ({ aboutUs }) => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-blue-500">
              About <span className="text-white">Us</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              {aboutUs?.intro ||
                "We are passionate creators, crafting extraordinary experiences that captivate and inspire. With innovation, dedication, and an eye for detail, we transform visions into unforgettable realities."}
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              {aboutUs?.mission ||
                "Our mission is to redefine event production and stage fabrication with precision, creativity, and a commitment to excellence. Whether it's a red-carpet affair or a custom stage design, we deliver perfection every time."}
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Learn More About Us
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-700">
              <img
                src={aboutUs?.image || Aboutusplaceholder}
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
