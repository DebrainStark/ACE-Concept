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
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
        />
      ) : (
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base text-white border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
      )}
      <div 
        className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-gray-800"
        style={{ backgroundColor: bgColor }}
      >
        <User size={10} className="text-white" />
      </div>
    </div>
  );
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={12}
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  
  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // Set initial width
    
    let timeoutId = null;
    const debouncedResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Handle automatic rotation
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Parallax effect for mouse movement
  useEffect(() => {
    if (windowWidth < 1024) return; // Only enable parallax on desktop
    
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
  }, [windowWidth]);

  // Calculate parallax movement
  const getParallaxStyle = (depth = 1) => {
    if (windowWidth < 1024) return {}; // Disable parallax on mobile/tablet
    
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
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Get card position styles based on index and active index
  const getCardStyle = (index) => {
    // Position variables
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    const isMobile = windowWidth < 768;
    
    // Base transforms
    let translateX = '0%';
    let translateY = '0%';
    let scale = 1;
    let rotate = '0deg';
    let zIndex = 40 - Math.abs(diff) * 10;
    let opacity = 1;
    
    // Determine position based on normalized difference
    if (normalizedDiff === 0) { // Active card
      translateX = '0%';
      translateY = '0%';
      scale = 1;
      rotate = '0deg';
      zIndex = 50;
    } else if (normalizedDiff === 1 || normalizedDiff === testimonials.length - 1) { // Next/Prev cards
      translateX = normalizedDiff === 1 ? (isMobile ? '75%' : '60%') : (isMobile ? '-75%' : '-60%');
      translateY = '5%';
      scale = 0.85;
      rotate = normalizedDiff === 1 ? '5deg' : '-5deg';
      zIndex = 40;
    } else { // Stacked cards
      // Cards behind current
      if (normalizedDiff <= testimonials.length / 2) {
        translateX = (isMobile ? '85%' : '80%');
        translateY = '10%';
        rotate = '10deg';
      } else {
        translateX = (isMobile ? '-85%' : '-80%');
        translateY = '10%';
        rotate = '-10deg';
      }
      scale = 0.7;
      opacity = 0.6;
      zIndex = 30;
    }
    
    return {
      transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`,
      zIndex,
      opacity
    };
  };

  // Check device type
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <section 
      ref={containerRef}
      className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -top-64 -left-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -bottom-64 -right-64 bg-blue-700 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={getParallaxStyle(0.1)}>
          <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Clients</span> Say
          </h2>
          <div className="mt-3 sm:mt-4 w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why leading brands trust our expertise in event experiences, 
            custom fabrication, and innovative LED solutions
          </p>
        </div>

        {/* Card Sorting Testimonials */}
        <div className="relative" style={getParallaxStyle(0.2)}>
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/50 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} className="group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Card Carousel */}
          <div 
            ref={cardsRef}
            className="relative h-[420px] sm:h-[380px] md:h-[340px] mx-auto"
            style={{ perspective: '1000px' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`absolute top-0 left-0 right-0 mx-auto w-full max-w-3xl cursor-pointer transition-all duration-600 ease-out`}
                style={{
                  ...getCardStyle(index),
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className={`group relative w-full bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-3 sm:p-5 md:p-6 border border-gray-700 rounded-xl shadow-xl ${
                    activeIndex === index ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                >
                  {/* Quote icon */}
                  <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 text-blue-500/30 transform -rotate-12">
                    <Quote size={isMobile ? 40 : 64} strokeWidth={1} />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-5 -right-5 sm:-top-10 sm:-right-10 w-20 sm:w-40 h-20 sm:h-40 bg-blue-500/5 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 w-20 sm:w-40 h-20 sm:h-40 bg-blue-600/5 rounded-full blur-xl"></div>
                  
                  <div className={`flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left relative z-10`}>
                    {/* Avatar and info */}
                    <div className="shrink-0 flex flex-col items-center">
                      <Avatar 
                        name={testimonial.name} 
                        bgColor={testimonial.bgColor}
                        image={testimonial.image} 
                      />
                      <StarRating rating={testimonial.rating} />
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mt-1 sm:mt-2 md:mt-3">
                        {testimonial.name}
                      </h3>
                      <p 
                        className="text-2xs sm:text-xs font-medium px-2 sm:px-3 py-0.5 rounded-full mt-1"
                        style={{ 
                          backgroundColor: `${testimonial.bgColor}20`,
                          color: testimonial.bgColor 
                        }}
                      >
                        {testimonial.position}
                      </p>
                    </div>
                    
                    {/* Testimonial content */}
                    <div className="md:border-l border-gray-700 md:pl-4 lg:pl-6 flex-1">
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 italic leading-relaxed">
                        "{testimonial.feedback}"
                      </p>
                      
                      <div className="mt-3 sm:mt-4 flex items-center">
                        <div 
                          className="h-1 w-6 sm:w-8 rounded-full"
                          style={{ backgroundColor: testimonial.bgColor }}
                        ></div>
                        <p className="ml-2 text-2xs sm:text-xs text-gray-400">
                          Project completed in 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-blue-500 w-4 sm:w-6" 
                    : "bg-white/30 hover:bg-white/50 w-2 sm:w-3"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 overflow-hidden rounded-full text-white text-sm sm:text-base font-medium">
            <span className="relative z-10 flex items-center">
              Work With Us
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={isMobile ? 16 : 18} />
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
        
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </section>
  );
};

export default ClientSection;