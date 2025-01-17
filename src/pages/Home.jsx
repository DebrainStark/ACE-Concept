import React, { useState, useEffect } from "react";
import { ArrowRight, Phone, Mail, Menu, X, ChevronRight } from "lucide-react";
import Navigation from "../components/Navigation";

const projects = [
  {
    id: 1,
    title: "Stage Design Excellence",
    category: "Stage Fabrication",
    image: "/images/project1.jpg",
  },
  {
    id: 2,
    title: "Red Carpet Premiere",
    category: "Event Setup",
    image: "/images/project2.jpg",
  },
  {
    id: 3,
    title: "Custom Event Solution",
    category: "Event Production",
    image: "/images/project3.jpg",
  },
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <Navigation
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black">
              <span className="block text-white">Crafting Extraordinary</span>
              <span className="block text-blue-500 mt-2">
                Event Experiences
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
              Professional stage fabrication, red carpet events, and custom
              solutions for unforgettable moments that leave lasting
              impressions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
                Explore Our Work
                <ChevronRight className="ml-2" size={20} />
              </button>
              <button className="px-8 py-4 border border-blue-500/30 text-white rounded-full font-medium hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center">
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-24 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Discover our latest and most impressive event productions
            </p>
          </div>

          <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl shadow-2xl shadow-blue-500/10 transform hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                  <div className="bg-[url('/images/placeholder.jpg')] bg-cover bg-center w-full h-64 transform group-hover:scale-110 transition-all duration-700"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-300">{project.category}</p>
                  <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    View Project <ChevronRight className="ml-1" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Contact Section */}
      <div className="relative bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900/10 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Ready to Create{" "}
                <span className="text-blue-500">Something Amazing?</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                Let's discuss your next event and bring your vision to life.
              </p>
            </div>
            <div className="space-y-6 md:text-right">
              <a
                href="tel:+1234567890"
                className="block md:inline-flex items-center text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Phone className="mr-2" size={20} />
                (123) 456-7890
              </a>
              <br />
              <a
                href="mailto:contact@aceconcept.com"
                className="block md:inline-flex items-center text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Mail className="mr-2" size={20} />
                contact@aceconcept.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
