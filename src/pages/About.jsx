import React, { useState, useEffect, useRef } from "react";
import { Users, Award, Target, Shield, Clock, MapPin, Star, ChevronDown, ChevronRight, ChevronLeft, X } from "lucide-react";

const AboutUs = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('purpose');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const sectionRefs = useRef({
    hero: null,
    about: null,
    services: null,
    team: null,
    goals: null
  });

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add debounce for better performance
    let timeoutId = null;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    handleResize(); // Set initial size
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // More efficient scroll handling with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Company information
  const companyInfo = {
    founded: "2008",
    director: "OLATUNDE DARAMOLA",
    purpose: "To be a voice within the Branding and Fabrication Industry by providing quality, bespoke and enhanced services, forge client relationship and profitability.",
    vision: "To provide quality services that exceeds the expectations of our esteemed customers.",
    mission: "To enhance our clients brands, build long term relationships with our customers and clients and provide exceptional Product services by pursuing business through innovation and quality service delivery."
  };

  // Team members details
  const teamMembers = [
    {
      role: "Managing Director",
      description: "Oversees all aspects of the company, including branding, fabrication, sales, and marketing. Sets the company's overall vision and strategy."
    },
    {
      role: "Creative Director",
      description: "Oversees the company's branding and design team. Develops and executes creative campaigns for clients."
    },
    {
      role: "Fabrication Manager",
      description: "Oversees the company's fabrication team. Manages the production of branded products and materials."
    },
    {
      role: "Project Manager",
      description: "Oversees the day-to-day execution of individual projects."
    },
    {
      role: "Branding Specialist",
      description: "Managing branding projects and all client brand identity and strategy for campaigns."
    }
  ];

  // Services provided by the company
  const services = [
    {
      title: "Red Carpet Media",
      description: "Branded experiences for VIP events, including media walls, step-and-repeat backdrops, and premium branding solutions.",
      icon: "activity"
    },
    {
      title: "Custom Stage Fabrication",
      description: "Crafting and building custom furniture, fixtures, stages and environments that elevate your event or brand activation.",
      icon: "star"
    },
    {
      title: "Event Signage",
      description: "Custom designed props and signage for all environments, produced to the highest quality standards.",
      icon: "file"
    },
    {
      title: "LED Installations",
      description: "Specialized design of custom built LED and laser-cutting services for all fabrications and branding needs.",
      icon: "monitor"
    },
    {
      title: "Branding & Design",
      description: "Strategic brand identity development that meets client needs and stands out in the marketplace.",
      icon: "book-open"
    },
    {
      title: "Customer Support",
      description: "End-to-end support throughout the branding and fabrication process, ensuring a seamless client experience.",
      icon: "help-circle"
    }
  ];

  // Goals for the company's future
  const goals = [
    "Regional expansion in the field of branding and develop a strong base of satisfied customers.",
    "Increase the assets and investments of the company to support the development of services.",
    "To build good reputation in branding and fabrication and become a key player in the print industry."
  ];

  // Animation class for fade-in effect
  const getFadeClass = (sectionId) => 
    visibleSections[sectionId] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  // Toggle section expansion on mobile
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Move to next service in the carousel
  const nextService = () => {
    setActiveServiceIndex((prev) => (prev + 1) % services.length);
  };

  // Move to previous service in the carousel
  const prevService = () => {
    setActiveServiceIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Check if we're on a mobile device
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section - Simplified for mobile */}
      <section 
        id="hero" 
        ref={el => sectionRefs.current.hero = el}
        className="relative bg-blue-900 py-16 md:py-28 lg:py-36 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
              Our <span className="text-blue-300">Story</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-10 leading-relaxed max-w-xl mx-auto">
              {isMobile ? 
                `Creating extraordinary branded experiences since ${companyInfo.founded}` : 
                `Transforming visions into extraordinary branded experiences since ${companyInfo.founded}`
              }
            </p>
            <div className="w-16 md:w-20 h-1 bg-blue-500 mx-auto mb-6 md:mb-10"></div>
            
            <a 
              href="#quick-nav" 
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              aria-label="Explore our story"
            >
              <ChevronDown size={24} className="text-blue-300" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Mobile-optimized Quick Navigation */}
      <div 
        id="quick-nav" 
        className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 hide-scrollbar">
            <a href="#about" className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">About</a>
            <a href="#services" className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Services</a>
            <a href="#team" className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Team</a>
            <a href="#goals" className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Goals</a>
            <a href="#contact" className="flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 whitespace-nowrap">Contact</a>
          </div>
        </div>
      </div>
      
      {/* About Section - Interactive tabs on mobile */}
      <section 
        id="about" 
        ref={el => sectionRefs.current.about = el}
        className="py-10 md:py-16 lg:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${getFadeClass('about')}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              About <span className="text-blue-600">Ace Concepts</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Mobile-specific tabs interface */}
            {isMobile ? (
              <div className="space-y-6">
                {/* Brief mobile summary */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Since {companyInfo.founded}, Ace Concepts Ventures has become a leading innovator in high-quality branding and fabricated illuminated signage in Nigeria, transforming ordinary spaces into extraordinary experiences.
                  </p>
                </div>
                
                {/* Tab navigation */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200">
                    <button 
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'purpose' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('purpose')}
                    >
                      Purpose
                    </button>
                    <button 
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'vision' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('vision')}
                    >
                      Vision
                    </button>
                    <button 
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'mission' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('mission')}
                    >
                      Mission
                    </button>
                    <button 
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'values' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('values')}
                    >
                      Values
                    </button>
                  </div>
                  
                  <div className="p-4">
                    {activeTab === 'purpose' && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-100 mt-0.5">
                          <Target size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Our Purpose</h3>
                          <p className="text-sm text-gray-700">{companyInfo.purpose}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'vision' && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-100 mt-0.5">
                          <Star size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Our Vision</h3>
                          <p className="text-sm text-gray-700">{companyInfo.vision}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'mission' && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-100 mt-0.5">
                          <Award size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Our Mission</h3>
                          <p className="text-sm text-gray-700">{companyInfo.mission}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'values' && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Core Values</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-3">
                            <div className="p-1.5 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                              <Users size={14} className="text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">Treating our customers with respect and faith</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="p-1.5 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                              <Shield size={14} className="text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">Honesty, integrity and business ethics in all aspects</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="p-1.5 rounded-full bg-blue-100 flex-shrink-0 mt-0.5">
                              <Clock size={14} className="text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">Growth through creativity, invention and innovation</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Desktop layout
              <>
                <div className={`transition-all duration-700 ${getFadeClass('about')}`}>                    
                  <div className="space-y-6 text-gray-700">
                    <p className="leading-relaxed">
                      Since its founding in {companyInfo.founded}, Ace Concepts Ventures has become a leading innovator and supplier of high-quality tailor-made branding and fabricated illuminated signage and media wall in Nigeria.
                    </p>
                    <p className="leading-relaxed">
                      We specialize in transforming ordinary spaces into extraordinary experiences with custom-built LED displays, laser-cut signage, and red carpet media branding for indoor and outdoor events that leave lasting impressions.
                    </p>
                    
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-2 rounded-full bg-blue-100">
                          <Target size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 text-gray-900">Our Purpose</h3>
                          <p className="text-gray-700">{companyInfo.purpose}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-2 rounded-full bg-blue-100">
                          <Star size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 text-gray-900">Our Vision</h3>
                          <p className="text-gray-700">{companyInfo.vision}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-white p-8 rounded-lg shadow-sm border border-gray-200 transition-all duration-700 delay-200 ${getFadeClass('about')}`}>
                  <div className="relative mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 inline-flex items-center">
                      <Award size={22} className="text-blue-600 mr-2" />
                      Our Mission
                    </h3>
                  </div>
                  
                  <p className="mb-8 text-gray-700 leading-relaxed">
                    {companyInfo.mission}
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Core Values</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-blue-100">
                          <Users size={16} className="text-blue-600" />
                        </div>
                        <span className="text-gray-700">Treating our customers with respect and faith</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-blue-100">
                          <Shield size={16} className="text-blue-600" />
                        </div>
                        <span className="text-gray-700">Honesty, integrity and business ethics in all aspects</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-blue-100">
                          <Clock size={16} className="text-blue-600" />
                        </div>
                        <span className="text-gray-700">Growth through creativity, invention and innovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Services Section - Carousel on mobile */}
      <section 
        id="services" 
        ref={el => sectionRefs.current.services = el}
        className="py-10 md:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${getFadeClass('services')}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              What We <span className="text-blue-600">Do</span>
            </h2>
            {!isMobile && (
              <p className="max-w-2xl mx-auto text-gray-600 mt-2">
                Ace Concepts Ventures provides professional media branding for events and fabricates all types of props and signage for indoor and outdoor events and activations.
              </p>
            )}
          </div>
          
          {/* Mobile service carousel */}
          {isMobile ? (
            <div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="relative">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${activeServiceIndex * 100}%)` }}
                    >
                      {services.map((service, index) => (
                        <div key={index} className="w-full flex-shrink-0 p-4">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="text-blue-600"
                              >
                                {service.icon === "activity" && <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>}
                                {service.icon === "star" && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}
                                {service.icon === "file" && (
                                  <>
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                  </>
                                )}
                                {service.icon === "monitor" && (
                                  <>
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                    <line x1="8" y1="21" x2="16" y2="21"/>
                                    <line x1="12" y1="17" x2="12" y2="21"/>
                                  </>
                                )}
                                {service.icon === "book-open" && (
                                  <>
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                  </>
                                )}
                                {service.icon === "help-circle" && (
                                  <>
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                  </>
                                )}
                              </svg>
                            </div>
                            
                            <h3 className="text-base font-medium mb-2 text-gray-900">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Carousel controls */}
                  <button 
                    onClick={prevService}
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700"
                    aria-label="Previous service"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  <button 
                    onClick={nextService}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700"
                    aria-label="Next service"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                
                {/* Carousel indicators */}
                <div className="py-3 px-4 border-t border-gray-200">
                  <div className="flex justify-center space-x-2">
                    {services.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === activeServiceIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                        aria-label={`Go to service ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Simple service list for quick access */}
              <div className="grid grid-cols-2 gap-2">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveServiceIndex(index)}
                    className={`p-2 rounded-lg border ${
                      index === activeServiceIndex 
                        ? 'border-blue-200 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700'
                    } text-xs font-medium text-center`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Desktop layout for services
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 ${getFadeClass('services')}`}
                  style={{ transitionDelay: `${(index % 3) * 100 + 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-blue-600"
                    >
                      {service.icon === "activity" && <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>}
                      {service.icon === "star" && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}
                      {service.icon === "file" && (
                        <>
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </>
                      )}
                      {service.icon === "monitor" && (
                        <>
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </>
                      )}
                      {service.icon === "book-open" && (
                        <>
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </>
                      )}
                      {service.icon === "help-circle" && (
                        <>
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                          <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </>
                      )}
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Team Section - Cards with flip effect on mobile */}
      <section 
        id="team" 
        ref={el => sectionRefs.current.team = el}
        className="py-10 md:py-16 lg:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${getFadeClass('team')}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our <span className="text-blue-600">Team</span>
            </h2>
            {!isMobile && (
              <p className="max-w-2xl mx-auto text-gray-600 mt-2">
                Meet the professionals behind Ace Concepts Ventures who bring creativity and excellence to every project.
              </p>
            )}
          </div>
          
          {/* Mobile team slider with swipeable cards */}
          {isMobile ? (
            <div className="overflow-x-auto py-4 hide-scrollbar">
              <div className="flex space-x-4 px-2 min-w-max">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="w-64 h-60 perspective-1000"
                  >
                    <div 
                      className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-lg border border-gray-200 ${
                        expandedSections[`team-card-${index}`] ? 'rotate-y-180' : ''
                      }`}
                      onClick={() => toggleSection(`team-card-${index}`)}
                    >
                      {/* Card Front */}
                      <div className="absolute inset-0 bg-white rounded-lg p-5 flex flex-col items-center justify-center text-center backface-hidden z-10">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Users size={24} className="text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.role}</h3>
                        <p className="text-xs text-gray-500 mt-auto">Tap to learn more</p>
                      </div>
                      
                      {/* Card Back */}
                      <div className="absolute inset-0 bg-blue-600 text-white rounded-lg p-5 flex flex-col backface-hidden rotate-y-180">
                        <h3 className="text-lg font-semibold mb-3">{member.role}</h3>
                        <p className="text-sm flex-grow">{member.description}</p>
                        <p className="text-xs mt-3 italic">Tap to flip back</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="inline-block bg-blue-50 px-3 py-2 rounded-md text-sm text-gray-700">
                  Led by <span className="font-semibold text-gray-900">{companyInfo.director}</span>
                </p>
              </div>
            </div>
          ) : (
            // Desktop layout
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 ${getFadeClass('team')}`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Users size={20} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.role}</h3>
                    </div>
                    <p className="text-gray-600 ml-11">{member.description}</p>
                  </div>
                ))}
              </div>
              
              <div className={`mt-10 text-center transition-all duration-700 delay-700 ${getFadeClass('team')}`}>
                <p className="inline-block bg-blue-50 px-4 py-3 rounded-lg text-gray-700">
                  Led by <span className="font-semibold text-gray-900">{companyInfo.director}</span>, our team works collaboratively to deliver outstanding results.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Goals Section - Interactive timeline on mobile */}
      <section 
        id="goals" 
        ref={el => sectionRefs.current.goals = el}
        className="py-10 md:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${getFadeClass('goals')}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our <span className="text-blue-600">Goals</span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Mobile goals timeline */}
            {isMobile ? (
              <div className="relative pl-8 border-l-2 border-blue-200 space-y-8 mb-8">
                {goals.map((goal, index) => (
                  <div 
                    key={index}
                    className="relative"
                  >
                    <span className="absolute -left-[25px] flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-white">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </span>
                    <div className="bg-white p-4 rounded-lg shadow-sm ml-2">
                      <p className="text-gray-700 text-sm">{goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop version
              <div className="space-y-12 mb-12">
                {goals.map((goal, index) => (
                  <div 
                    key={index}
                    className={`relative pl-10 transition-all duration-700 ${getFadeClass('goals')}`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  >
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-lg text-gray-700">{goal}</p>
                    {index < goals.length - 1 && (
                      <div className="absolute left-3 top-6 bottom-0 w-px bg-blue-200 -mb-12"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Contact Information - With interactive map link on mobile */}
            <div 
              id="contact"
              className={`p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-100 transition-all duration-700 ${isMobile ? '' : `delay-700 ${getFadeClass('goals')}`}`}
            >
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-gray-900 flex items-center">
                <MapPin size={isMobile ? 16 : 18} className="mr-2 text-blue-600" />
                Contact Information
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Lagos, Nigeria</p>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Main contact: <span className="font-semibold text-gray-900">{companyInfo.director}</span>
                  </p>
                </div>
                
                {isMobile && (
                  <a 
                    href="https://maps.google.com/?q=Lagos,Nigeria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <MapPin size={14} className="mr-1" />
                    View Map
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to top button - Only visible after scrolling down */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
      
      {/* Utility styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

// Missing ChevronUp component import
const ChevronUp = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );
};

export default AboutUs;