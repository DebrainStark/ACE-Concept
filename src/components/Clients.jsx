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
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
        />
      ) : (
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm text-white border-2 border-gray-800 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
      )}
      <div 
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-gray-800"
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
  
  // Touch/Drag handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
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
    // Only auto-rotate when not being dragged
    if (isDragging) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isDragging]);

  // Parallax effect for mouse movement - lightweight version
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

  // Calculate parallax movement - reduced effect
  const getParallaxStyle = (depth = 1) => {
    if (windowWidth < 1024) return {}; // Disable parallax on mobile/tablet
    
    const xMovement = (mousePosition.x - 0.5) * depth * 10; // Reduced from 20 to 10
    const yMovement = (mousePosition.y - 0.5) * depth * 10; // Reduced from 20 to 10
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

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50; // Minimum swipe distance
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe left
        nextSlide();
      } else {
        // Swipe right
        prevSlide();
      }
    }
    
    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    handleTouchEnd();
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      handleTouchEnd();
    }
  };

  // Get card position styles based on index and active index - more subtle effect
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
    
    // Determine position based on normalized difference - reduced offsets for desktop
    if (normalizedDiff === 0) { // Active card
      translateX = '0%';
      translateY = '0%';
      scale = 1;
      rotate = '0deg';
      zIndex = 50;
    } else if (normalizedDiff === 1 || normalizedDiff === testimonials.length - 1) { // Next/Prev cards
      translateX = normalizedDiff === 1 ? (isMobile ? '75%' : '50%') : (isMobile ? '-75%' : '-50%');
      translateY = '2%'; // Reduced from 5% to 2%
      scale = 0.9; // Increased from 0.85 to 0.9
      rotate = normalizedDiff === 1 ? '3deg' : '-3deg'; // Reduced from 5deg to 3deg
      zIndex = 40;
    } else { // Stacked cards
      // Cards behind current - reduced offsets
      if (normalizedDiff <= testimonials.length / 2) {
        translateX = (isMobile ? '85%' : '65%');
        translateY = '4%'; // Reduced from 10% to 4%
        rotate = '6deg'; // Reduced from 10deg to 6deg
      } else {
        translateX = (isMobile ? '-85%' : '-65%');
        translateY = '4%'; // Reduced from 10% to 4%
        rotate = '-6deg'; // Reduced from 10deg to 6deg
      }
      scale = 0.8; // Increased from 0.7 to 0.8
      opacity = 0.7; // Increased from 0.6 to 0.7
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
      className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Simplified background elements - reduced size and blur */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] -top-64 -left-64 bg-blue-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] -bottom-64 -right-64 bg-blue-700 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-10" style={getParallaxStyle(0.1)}>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium tracking-wider uppercase mb-3">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            What Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Clients</span> Say
          </h2>
          <div className="mt-3 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Card Sorting Testimonials */}
        <div className="relative" style={getParallaxStyle(0.2)}>
          {/* Navigation buttons - positioned closer to content */}
          <button 
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 border border-gray-700 text-white flex items-center justify-center hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} className="group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Card Carousel with swipe functionality */}
          <div 
            ref={cardsRef}
            className="relative h-[360px] sm:h-[320px] md:h-[300px] mx-auto"
            style={{ perspective: '1000px' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Visual indicator for swipe */}
            {isDragging && (
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-50 flex justify-between pointer-events-none">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500/20 rounded-full backdrop-blur-sm">
                  <ChevronLeft size={18} className="text-white/70" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500/20 rounded-full backdrop-blur-sm">
                  <ChevronRight size={18} className="text-white/70" />
                </div>
              </div>
            )}
            
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                onClick={() => !isDragging && goToSlide(index)}
                className={`absolute top-0 left-0 right-0 mx-auto w-[92%] sm:w-[85%] md:w-[80%] max-w-2xl cursor-pointer transition-all duration-600 ease-out`}
                style={{
                  ...getCardStyle(index),
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className={`group relative w-full bg-gradient-to-b from-gray-800/80 to-gray-900/90 backdrop-blur-sm p-3 sm:p-4 border border-gray-700/70 rounded-xl shadow-lg ${
                    activeIndex === index ? 'ring-1 ring-blue-500/40' : ''
                  }`}
                >
                  {/* Quote icon - reduced size */}
                  <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 text-blue-500/20 transform -rotate-12">
                    <Quote size={isMobile ? 32 : 40} strokeWidth={1} />
                  </div>
                  
                  {/* Decorative elements - simplified */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500/5 rounded-full blur-lg"></div>
                  
                  <div className={`flex flex-col md:flex-row gap-3 md:gap-4 items-center md:items-start text-center md:text-left relative z-10`}>
                    {/* Avatar and info */}
                    <div className="shrink-0 flex flex-col items-center">
                      <Avatar 
                        name={testimonial.name} 
                        bgColor={testimonial.bgColor}
                        image={testimonial.image} 
                      />
                      <StarRating rating={testimonial.rating} />
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1 sm:mt-2">
                        {testimonial.name}
                      </h3>
                      <p 
                        className="text-2xs sm:text-xs font-medium px-2 py-0.5 rounded-full mt-1"
                        style={{ 
                          backgroundColor: `${testimonial.bgColor}20`,
                          color: testimonial.bgColor 
                        }}
                      >
                        {testimonial.position}
                      </p>
                    </div>
                    
                    {/* Testimonial content */}
                    <div className="md:border-l border-gray-700/50 md:pl-4 flex-1">
                      <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed line-clamp-4">
                        "{testimonial.feedback}"
                      </p>
                      
                      <div className="mt-2 sm:mt-3 flex items-center">
                        <div 
                          className="h-0.5 w-6 rounded-full"
                          style={{ backgroundColor: testimonial.bgColor }}
                        ></div>
                        <p className="ml-2 text-2xs text-gray-400">
                          Project completed in 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Professional Swipe Instruction */}
          {(isMobile || isTablet) && !hasInteracted && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center pointer-events-none animate-swipeGuide z-50">
              <div className="bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-lg shadow-lg border border-white/10">
                <div className="flex items-center justify-center space-x-3 text-sm text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8l4 4-4 4"></path>
                    <path d="M7 8l-4 4 4 4"></path>
                    <path d="M14 4l-4 16"></path>
                  </svg>
                  <span className="font-medium">Swipe to navigate</span>
                  <div className="w-4 animate-swipeArrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Dots Indicators - simplified */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-blue-500 w-5" 
                    : "bg-white/20 hover:bg-white/40 w-1.5"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <a 
            href="/contact"
            className="inline-block group relative px-6 py-2.5 bg-blue-600 overflow-hidden rounded-lg text-white text-sm font-medium"
          >
            <span className="relative z-10 flex items-center">
              Work With Us
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        .duration-600 {
          transition-duration: 1000ms;
        }
        
        @keyframes fadeOut {
          0% { opacity: 0.7; }
          70% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        
        .animate-fadeOut {
          animation: fadeOut 4s forwards;
        }
        
        @keyframes swipeGuide {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 0); }
        }
        
        .animate-swipeGuide {
          animation: swipeGuide 8s forwards;
        }
        
        @keyframes handSwipe {
          0% { transform: translateX(-15px); opacity: 0; }
          20% { transform: translateX(-15px); opacity: 1; }
          80% { transform: translateX(15px); opacity: 1; }
          100% { transform: translateX(15px); opacity: 0; }
        }
        
        .animate-handSwipe {
          animation: handSwipe 2s infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
};

export default ClientSection;