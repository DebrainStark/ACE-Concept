import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronRight, ArrowRight, Camera, Scissors, Monitor, Award, ChevronLeft, Play, Pause, Target, Star } from "lucide-react";
import heroBg1 from "../assets/event setup1.jpg";
import heroBg2 from "../assets/stagefabrication.jpg";
import heroBg3 from "../assets/event production2.jpg";
import heroBg4 from "../assets/event production1.jpg";

const Hero = () => {
  // Company info from the provided documents
  const companyInfo = {
    founding: "2008",
    mainContact: "OLATUNDE DARAMOLA",
    purpose: "To be a voice within the Branding and Fabrication Industry by providing quality, bespoke and enhanced services, forge client relationship and profitability.",
    vision: "To provide quality services that exceeds the expectations of our esteemed customers.",
    mission: "To enhance our clients brands, build long term relationships with our customers and clients and provide exceptional Product services by pursuing business through innovation and quality service delivery."
  };

  // Enhanced with descriptions based on company details
  const heroContent = useMemo(() => [
    {
      image: heroBg1,
      caption: "Red Carpet Media Experiences",
      description: "Brand-centric media walls and custom red carpet installations for VIP events"
    },
    {
      image: heroBg2,
      caption: "Custom Stage Fabrication",
      description: "High-quality tailor-made branding and fabricated illuminated signage"
    },
    {
      image: heroBg3,
      caption: "Specialized Event Signage",
      description: "Props and signage for indoor and outdoor events and activations"
    },
    {
      image: heroBg4,
      caption: "LED & Laser-Cut Installations",
      description: "Custom built LED and laser-cutting services for all fabrications and branding"
    }
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [showHighlight, setShowHighlight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [textReveal, setTextReveal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [touchStartX, setTouchStartX] = useState(null);
  
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const carouselRef = useRef(null);

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
  
  // Parallax effect for mouse movement - with performance optimization
  useEffect(() => {
    if (windowWidth < 1024) return; // Only enable parallax on desktop
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX - left) / width,
          y: (e.clientY - top) / height
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [windowWidth]);

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

  // Text animation effect
  useEffect(() => {
    const revealInterval = setInterval(() => {
      setTextReveal(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(revealInterval);
        return prev;
      });
    }, 30);
    
    return () => clearInterval(revealInterval);
  }, []);

  // Reveal highlight effect with delay
  useEffect(() => {
    const highlightTimer = setTimeout(() => {
      setShowHighlight(true);
    }, 800);
    
    return () => clearTimeout(highlightTimer);
  }, []);

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

  // Calculate parallax movement with boundaries to prevent extreme movements
  const getParallaxStyle = (depth = 1) => {
    if (windowWidth < 1024) return {}; // Disable parallax on mobile/tablet
    
    const boundedX = Math.max(0, Math.min(1, mousePosition.x));
    const boundedY = Math.max(0, Math.min(1, mousePosition.y));
    
    // Reduced movement amount for more subtle effect
    const xMovement = (boundedX - 0.5) * depth * 20;
    const yMovement = (boundedY - 0.5) * depth * 20;
    
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
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
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
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
      {/* Decorative elements - desktop only */}
      {isDesktop && (
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                width: '6rem',
                height: '6rem',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' stroke='%23ffffff' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Background Image Carousel */}
      <div 
        ref={carouselRef}
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
                : 'bg-gradient-to-br from-red-900/60 via-black/60 to-blue-900/40'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Lighting effect - desktop only */}
      {isDesktop && isHovering && (
        <div 
          className="absolute inset-0 z-1 opacity-0 hover:opacity-60 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 70%)`,
          }}
        ></div>
      )}

      {/* Decorative shapes - desktop only */}
      {isDesktop && (
        <div className="absolute inset-0 z-1 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-32 border-2 border-red-500/20 opacity-40"
            style={{
              aspectRatio: '1/1',
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              ...getParallaxStyle(0.6),
              animation: "pulse 8s infinite",
            }}
          ></div>
          <div 
            className="absolute bottom-1/3 right-1/4 w-40 border-2 border-blue-500/20 opacity-30"
            style={{
              aspectRatio: '1/1',
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              ...getParallaxStyle(0.8),
              animation: "pulse 12s infinite 2s",
            }}
          ></div>
        </div>
      )}

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
                  ? `w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-red-500' : 'bg-white/30'}`
                  : `w-10 h-1 sm:w-12 rounded-full ${index === currentImageIndex ? 'bg-red-500 w-14 sm:w-16' : 'bg-white/30 hover:bg-white/50'}`
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
              <p className="text-white/60 text-xs mt-1 hidden sm:block">
                {heroContent[currentImageIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className={`lg:col-span-8 text-center ${isDesktop ? 'lg:text-left' : ''}`} style={getParallaxStyle(0.2)}>
            {/* Company badges - desktop only */}
            {isDesktop && (
              <div className="relative inline-block mb-4">
                <div className="flex flex-wrap gap-2 items-center text-red-400 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                  <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">SINCE {companyInfo.founding}</span>
                  <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">CUSTOM FABRICATION</span>
                  <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">LED DESIGN</span>
                </div>
              </div>
            )}
            
            {/* Main Heading - Optimized for all devices */}
            <h1 ref={textRef} className={`${getTitleClass()} relative`}>
              <div className="overflow-hidden">
                <span className="block text-white transform transition-transform duration-1000" 
                  style={{ transform: `translateY(${textReveal >= 30 ? '0' : '100%'})` }}>
                  {/* Simplified text on mobile */}
                  {isMobile ? 'Elevating Brand' : 'Elevating '}
                  <span className="relative">
                    {!isMobile && (
                      <>
                        Brand
                        {showHighlight && (
                          <span className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-blue-600/10 blur-sm rounded-lg -z-10"></span>
                        )}
                        Presence
                      </>
                    )}
                  </span>
                </span>
              </div>
              <div className="overflow-hidden mt-1">
                <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 text-transparent bg-clip-text transform transition-transform duration-1000"
                  style={{ transform: `translateY(${textReveal >= 60 ? '0' : '100%'})` }}>
                  {isMobile ? 'Innovation' : 'Through Innovation'}
                </span>
              </div>
            </h1>
            
            {/* Description - Simplified for mobile */}
            <div className="mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0">
              <p className={`${isMobile ? 'text-sm max-w-xs mx-auto' : 'text-base sm:text-lg'} text-gray-300 leading-relaxed opacity-0 animate-fade-in`}
                style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
                {isMobile 
                  ? "Leading innovator in quality branding and illuminated signage for events since 2008."
                  : `Since its founding in ${companyInfo.founding}, Ace Concepts Ventures has become a leading innovator and supplier of high-quality tailor-made branding and fabricated illuminated signage and media wall in Nigeria.`
                }
              </p>
              
              {/* Service tags - desktop only */}
              {isDesktop && (
                <div className="flex flex-wrap gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                  <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 rounded-full bg-red-500/20 mr-2 group-hover:bg-red-500/30 transition-colors duration-300">
                      <Camera size={16} className="text-red-400" />
                    </div>
                    <span>Red Carpet Media</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 rounded-full bg-purple-500/20 mr-2 group-hover:bg-purple-500/30 transition-colors duration-300">
                      <Scissors size={16} className="text-purple-400" />
                    </div>
                    <span>Custom Fabrication</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 rounded-full bg-blue-500/20 mr-2 group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Monitor size={16} className="text-blue-400" />
                    </div>
                    <span>LED & Laser-Cut Services</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Buttons - Optimized for all devices */}
            <div 
              className={`mt-8 sm:mt-10 flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 opacity-0 animate-fade-in justify-center ${isDesktop ? 'lg:justify-start' : ''}`} 
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            >
              <a 
                href="/portfolio" 
                className={`group relative px-5 py-3 ${isMobile ? 'bg-white text-red-600' : 'bg-red-600 text-white'} rounded-full text-base font-medium text-center`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isMobile ? 'View Work' : 'Our Portfolio'}
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </span>
                {!isMobile && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            
                  </>
                )}
              </a>
              
              {!isMobile && (
                <a 
                  href="/contact" 
                  className="group relative px-6 py-3 bg-transparent border border-white/20 overflow-hidden rounded-full text-white text-base font-medium hover:border-white/40 transition-colors text-center"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Request a Quote
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              )}
            </div>
          </div>
          
          {/* Company info card - desktop only */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative" style={getParallaxStyle(0.4)}>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-tr from-red-500/10 to-blue-500/10 rounded-full blur-xl"></div>
              
              {/* Info card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-transform duration-500 hover:shadow-xl hover:shadow-red-500/10">
                <h3 className="text-xl font-bold text-white mb-4">Our Vision & Mission</h3>
                
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300 group">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-blue-500/20 mt-1 mr-3 group-hover:bg-blue-500/30 transition-colors duration-300 shrink-0">
                        <Target size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Our Vision</h4>
                        <p className="text-xs text-gray-300 mt-1">{companyInfo.vision}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden p-3 bg-gradient-to-r from-purple-900/30 to-purple-800/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 group">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-purple-500/20 mt-1 mr-3 group-hover:bg-purple-500/30 transition-colors duration-300 shrink-0">
                        <Star size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Our Mission</h4>
                        <p className="text-xs text-gray-300 mt-1">To enhance our clients brands and build long term relationships through innovation and quality service delivery.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden p-3 bg-gradient-to-r from-red-900/30 to-red-800/10 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300 group">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-red-500/20 mr-3 group-hover:bg-red-500/30 transition-colors duration-300">
                        <Award size={20} className="text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Award-Winning Excellence</h4>
                        <p className="text-xs text-gray-300 mt-1">Bringing creativity & quality to every project</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-white">Main Contact:</span>
                    </div>
                    <span className="text-sm text-red-400 font-medium">{companyInfo.mainContact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom cursor effect - desktop large screens only */}
      {isHovering && windowWidth >= 1280 && (
        <div 
          className="fixed w-12 h-12 rounded-full border-2 border-red-400/30 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transition: "transform 0.1s ease-out, opacity 0.3s ease",
          }}
        ></div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(15px);
          }
          50% {
            transform: translateY(-25px) translateX(-5px);
          }
          75% {
            transform: translateY(-10px) translateX(-15px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        
        @keyframes kenBurns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          100% {
            transform: scale(1.1) translateX(-10px) translateY(-10px);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
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
      `}</style>
    </div>
  );
};

export default Hero;