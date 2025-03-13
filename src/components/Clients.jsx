import React, { useState, useRef, useEffect } from "react";
import { User, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Marketing Director, ABC Corp",
    feedback: "Working with the Ace Concepts team transformed our product launch. Their red carpet setup and custom LED displays created a premium experience that left our guests amazed.",
    bgColor: "#E63946", // Red for Red Carpet
    rating: 5,
    image: "/api/placeholder/64/64"
  },
  {
    id: 2,
    name: "Robert Smith",
    position: "CEO, Eventify",
    feedback: "The custom fabrication work exceeded all expectations. The precision of their laser-cut displays perfectly showcased our brand identity across the entire venue.",
    bgColor: "#7209B7", // Purple for Fabrication
    rating: 5,
    image: "/api/placeholder/64/64"
  },
  {
    id: 3,
    name: "Sophia Lee",
    position: "Operations Manager, Dream Events",
    feedback: "From design to execution, their attention to detail was impeccable. The LED installations created exactly the atmosphere we were looking for at our corporate gala.",
    bgColor: "#4361EE", // Blue for LED
    rating: 4,
    image: "/api/placeholder/64/64"
  },
  {
    id: 4,
    name: "James Brown",
    position: "Founder, Luxe Gatherings",
    feedback: "Ace Concepts Ventures delivered exceptional custom props and signage for our event. Their ability to transform our vision into reality was truly impressive.",
    bgColor: "#3A86FF", // Light Blue for Technical
    rating: 5,
    image: "/api/placeholder/64/64"
  },
];

const Avatar = ({ name, bgColor, image }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
      )}
      <div 
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border border-gray-800"
        style={{ backgroundColor: bgColor }}
      >
        <User size={14} className="text-white" />
      </div>
    </div>
  );
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1 mb-3">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

const ClientSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  
  // Handle automatic rotation
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Parallax effect for mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax movement
  const getParallaxStyle = (depth = 1) => {
    const xMovement = (mousePosition.x - 0.5) * depth * 20;
    const yMovement = (mousePosition.y - 0.5) * depth * 20;
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] -top-64 -left-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-64 -right-64 bg-blue-700 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16" style={getParallaxStyle(0.1)}>
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Clients</span> Say
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why leading brands trust our expertise in event experiences, 
            custom fabrication, and innovative LED solutions
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-10" style={getParallaxStyle(0.2)}>
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Testimonial Carousel */}
          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-xl shadow-2xl"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full flex items-stretch"
                >
                  <div 
                    className="group relative w-full bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 md:p-12 border border-gray-700 rounded-xl"
                  >
                    {/* Quote icon */}
                    <div className="absolute -top-5 -left-5 text-blue-500/30 transform -rotate-12">
                      <Quote size={64} strokeWidth={1} />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full blur-xl"></div>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                      {/* Avatar and info */}
                      <div className="shrink-0 flex flex-col items-center">
                        <Avatar 
                          name={testimonial.name} 
                          bgColor={testimonial.bgColor}
                          image={testimonial.image} 
                        />
                        <StarRating rating={testimonial.rating} />
                        <h3 className="text-xl font-bold text-white mt-4">
                          {testimonial.name}
                        </h3>
                        <p 
                          className="text-sm font-medium px-3 py-1 rounded-full mt-2"
                          style={{ 
                            backgroundColor: `${testimonial.bgColor}20`,
                            color: testimonial.bgColor 
                          }}
                        >
                          {testimonial.position}
                        </p>
                      </div>
                      
                      {/* Testimonial content */}
                      <div className="md:border-l border-gray-700 md:pl-8 flex-1">
                        <p className="text-xl text-gray-300 italic leading-relaxed">
                          "{testimonial.feedback}"
                        </p>
                        
                        <div className="mt-8 flex items-center">
                          <div 
                            className="h-1 w-12 rounded-full"
                            style={{ backgroundColor: testimonial.bgColor }}
                          ></div>
                          <p className="ml-4 text-sm text-gray-400">
                            Project completed in 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-blue-500 w-6" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-blue-600 overflow-hidden rounded-full text-white font-medium">
            <span className="relative z-10 flex items-center">
              Work With Us
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-x-full inset-y-0 w-3/4 bg-white/20 skew-x-12 group-hover:animate-shine"></span>
          </button>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        
        .group-hover\:animate-shine:hover {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientSection;