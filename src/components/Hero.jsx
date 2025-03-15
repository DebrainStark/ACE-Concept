import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowRight, ChevronLeft, Play, Pause } from "lucide-react";
import heroBg1 from "../assets/event setup1.jpg";
import heroBg2 from "/Hero1.png";
import heroBg3 from "/Hero2.png";
import heroBg4 from "/Hero3.png";

const Hero = () => {
  // Enhanced with descriptions based on company details
  const heroContent = [
    {
      image: heroBg1,
      caption: "Red Carpet Media Experiences",
      description: "Brand-centric media walls and custom red carpet installations"
    },
    {
      image: heroBg2,
      caption: "Custom Stage Fabrication",
      description: "High-quality tailor-made branding and fabricated signage"
    },
    {
      image: heroBg3,
      caption: "Specialized Event Signage",
      description: "Props and signage for indoor and outdoor events"
    },
    {
      image: heroBg4,
      caption: "LED & Laser-Cut Installations",
      description: "Custom built LED and laser-cutting services"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [touchStartX, setTouchStartX] = useState(null);
  
  const containerRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Handle initial load animation
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  // Window resize listener for responsive handling
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

  // Image carousel effect - with cleanup improvements
  useEffect(() => {
    if (!isPlaying) return;
    
    autoplayTimerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 5000);
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, heroContent.length]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Detect swipe (with minimum threshold to avoid accidental swipes)
    if (Math.abs(diff) > 70) {
      if (diff > 0) {
        // Swipe left, go next
        goToNextSlide();
      } else {
        // Swipe right, go previous
        goToPrevSlide();
      }
    }
    
    setTouchStartX(null);
  };

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
    
    // Reset the autoplay timer when manually navigating
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
      }, 5000);
    }
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroContent.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroContent.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Determine text sizes based on screen size for better responsiveness
  const getTitleClass = () => {
    if (windowWidth < 375) return 'text-3xl font-bold leading-tight';
    if (windowWidth < 480) return 'text-4xl font-bold leading-tight';
    if (windowWidth < 640) return 'text-5xl font-bold leading-tight';
    if (windowWidth < 768) return 'text-5xl font-bold leading-tight';
    if (windowWidth < 1024) return 'text-6xl font-bold leading-tight';
    if (windowWidth < 1280) return 'text-6xl font-black leading-tight';
    return 'text-7xl font-black leading-tight';
  };

  // Check device type
  const isMobile = windowWidth < 768;
  const isDesktop = windowWidth >= 1024;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[100svh]' : 'min-h-screen'} flex items-center overflow-hidden group ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      onMouseEnter={() => isDesktop && setIsHovering(true)}
      onMouseLeave={() => isDesktop && setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {heroContent.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${item.image})`,
              opacity: index === currentImageIndex ? 1 : 0,
              transform: `scale(${isHovering && isDesktop ? 1.05 : 1})`,
              animation: index === currentImageIndex && isDesktop ? "kenBurns 15s ease-in-out infinite alternate" : "none",
            }}
          >
            {/* Optimized gradient overlay */}
            <div className={`absolute inset-0 ${
              isMobile 
                ? 'bg-black/60' 
                : 'bg-gradient-to-br from-black/70 via-black/60 to-black/50'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - More accessible on mobile */}
      <div className="absolute z-10 inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-4 md:px-6">
        <button 
          onClick={goToPrevSlide}
          className={`${
            isMobile 
              ? 'w-10 h-10 bg-black/40' 
              : 'w-12 h-12 bg-black/30 opacity-0 group-hover:opacity-80'
          } text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-105`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>
        
        <button 
          onClick={goToNextSlide}
          className={`${
            isMobile 
              ? 'w-10 h-10 bg-black/40' 
              : 'w-12 h-12 bg-black/30 opacity-0 group-hover:opacity-80'
          } text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-105`}
          aria-label="Next slide"
        >
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>
      </div>
      
      {/* Slide Indicators - Optimized for all devices */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex flex-col items-center">
        {/* Indicators - Dots on mobile, bars on desktop */}
        <div className="flex space-x-2 sm:space-x-3 mb-2">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                isMobile
                  ? `w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/30'}`
                  : `w-10 h-1 sm:w-12 rounded-full ${index === currentImageIndex ? 'bg-white w-14 sm:w-16' : 'bg-white/30 hover:bg-white/50'}`
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentImageIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        
        {/* Playback controls - Only on desktop */}
        {!isMobile && (
          <div className="hidden sm:flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <button 
              onClick={togglePlayPause}
              className="mr-3 text-white/80 hover:text-white transition-colors p-2"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div>
              <p className="text-white/80 text-sm font-light">
                {currentImageIndex + 1}/{heroContent.length} · {heroContent[currentImageIndex].caption}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Hero Content - Simplified */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center mx-auto max-w-3xl">
          {/* Main Heading - With Animation */}
          <h1 className={`${getTitleClass()} text-white mb-4`}>
            <div className="overflow-hidden">
              <span className="block text-white transform transition-transform duration-1000 animate-slide-up">
                Elevating Brand Presence
              </span>
            </div>
            <div className="overflow-hidden mt-1">
              <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 text-transparent bg-clip-text transform transition-transform duration-1000 animate-slide-up-delay">
                Through Innovation
              </span>
            </div>
          </h1>
          
          {/* Description - With Animation */}
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            Leading innovator in quality branding and fabricated illuminated signage for events
            since 2008. We help businesses stand out with custom-designed solutions.
          </p>
          
          {/* CTA Buttons - With Animation */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
            <a 
              href="/portfolio" 
              className="group relative px-8 py-3 bg-blue-600 text-white rounded-full text-base font-medium transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                Our Portfolio
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </a>
            
            <a 
              href="/contact" 
              className="group relative px-8 py-3 bg-transparent border border-white/30 rounded-full text-white text-base font-medium hover:border-white/60 transition-colors w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                Request a Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`        
        @keyframes kenBurns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          100% {
            transform: scale(1.1) translateX(-10px) translateY(-10px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;