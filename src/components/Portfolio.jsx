import React, { useState } from "react";
import portfolio1 from "../assets/event setup1.jpg"; // Replace with actual image paths

const portfolioItems = [
  { id: 1, title: "Event Setup", image: portfolio1 },
  { id: 2, title: "Stage Fabrication", image: portfolio1 },
  { id: 3, title: "Lighting Design", image: portfolio1 },
  { id: 4, title: "Audio Production", image: portfolio1 },
  { id: 5, title: "Custom Props", image: portfolio1 },
  { id: 6, title: "Red Carpet Events", image: portfolio1 },
];

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight">
            Our <span className="text-blue-500">Portfolio</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Discover the projects that showcase our creativity and expertise.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{selectedItem.title}</h3>
                <button
                  className="text-gray-400 hover:text-white text-2xl"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-300 text-lg">
                  Dive into the details of our work in{" "}
                  {selectedItem.title.toLowerCase()}. This project exemplifies
                  our dedication to creativity and excellence.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
