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
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-blue-500">Portfolio</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A glimpse into our world of creativity and innovation.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setSelectedItem(null)}
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-300">
                  Explore the intricate details of our work, crafted to leave
                  lasting impressions. This is a showcase of our expertise in{" "}
                  {selectedItem.title.toLowerCase()}.
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
