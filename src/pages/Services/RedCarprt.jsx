import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Star, MessageCircle, Calendar, Users, Camera, ChevronLeft, ChevronRight, Check, Phone, ChevronDown, ChevronUp } from "lucide-react";

const RedCarpetEvent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("services");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  
  // Check if we're on mobile - MOVED BEFORE USAGE
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Detect window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize(); // Set initial size
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Carousel navigation
  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setActiveSlide(prev => prev === 0 ? caseStudies.length - 1 : prev - 1);
  };
  
  // Mobile gallery rotation
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % redCarpetProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  // Floating CTA button that appears when scrolling
  const renderFloatingCTA = () => {
    if (isMobile && scrollPosition > 300) {
      return (
        <div className="fixed bottom-5 right-5 z-50 animate-pulse-slow">
          <a 
            href="/contact" 
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
            aria-label="Request a quote"
          >
            <MessageCircle size={24} />
          </a>
        </div>
      );
    }
    return null;
  };
  
  // Past Red Carpet Projects
  const redCarpetProjects = [
    {
      id: 1,
      title: "Lagos Fashion Week Media Wall",
      description: "Custom fabricated media wall with integrated LED lighting for Nigeria's premier fashion event",
      image: "/Cubana.png",
      client: "Lagos Fashion Week",
      attendees: "1,500+",
      year: "2024"
    },
    {
      id: 2,
      title: "Film Festival Red Carpet Experience",
      description: "Premium red carpet setup with sponsor integration and photo backdrop",
      image: "/Cubana.png",
      client: "Lagos International Film Festival",
      attendees: "800+",
      year: "2023"
    },
    {
      id: 3,
      title: "Charity Gala Media Backdrop",
      description: "Sponsor-integrated media wall with premium finishes for high-end charity event",
      image: "/Ciroc.png",
      client: "Children's Foundation Nigeria",
      attendees: "600+",
      year: "2024"
    },
    {
      id: 4,
      title: "Award Night Branded Entrance",
      description: "Immersive branded entrance with custom lighting and sponsor integration",
      image: "/Cubana.png",
      client: "Nigeria Entertainment Awards",
      attendees: "1,200+",
      year: "2023"
    },
    {
      id: 5,
      title: "Corporate Gala Evening",
      description: "Elegant branded media wall with interactive elements for annual corporate celebration",
      image: "/Ciroc.png",
      client: "Nigeria Banking Association",
      attendees: "450+",
      year: "2024"
    }
  ];
  
  // Case Studies with more detailed information
  const caseStudies = [
    {
      id: 1,
      title: "Lagos Fashion Week 2024",
      description: "Creating an unforgettable red carpet experience for Africa's premier fashion event",
      challenge: "Design a media wall that would accommodate multiple sponsors while maintaining aesthetic appeal and delivering a premium backdrop for celebrity photography.",
      solution: "We created a modular design with integrated lighting that allowed for sponsor logos to be tastefully displayed. Special attention was given to lighting angles to ensure perfect photography conditions.",
      result: "The media wall generated over 2 million social media impressions, with 98% positive sentiment from sponsors and attendees.",
      image: "/Cubana.png",
      client: "Lagos Fashion Week",
      year: "2024"
    },
    {
      id: 2,
      title: "Children's Foundation Annual Gala",
      description: "Elevating a charity event with a sophisticated red carpet experience that balanced branding with elegance",
      challenge: "Create a premium red carpet experience that would attract celebrity attendance while keeping the focus on the charitable cause.",
      solution: "We designed a subtle yet impactful media wall with elegant lighting and thoughtful sponsor placement. QR codes were discretely integrated to allow for direct donations.",
      result: "The event raised 35% more funds than the previous year, with celebrities and attendees praising the sophisticated atmosphere.",
      image: "/Ciroc.png",
      client: "Children's Foundation Nigeria",
      year: "2024"
    },
    {
      id: 3,
      title: "Nigeria Entertainment Awards",
      description: "Designing an immersive entrance experience that built excitement and created memorable photo opportunities",
      challenge: "Create a red carpet experience that would stand out on social media and create buzz for the awards show.",
      solution: "We designed a 360-degree photo experience with multiple branded touchpoints, including an overhead arch, floor branding, and interactive lighting elements.",
      result: "Generated over 3.5 million social media impressions and was featured in all major entertainment publications across West Africa.",
      image: "/Cubana.png",
      client: "Nigeria Entertainment Awards",
      year: "2023"
    }
  ];
  
  // Mobile navigation tabs
  const mobileTabs = [
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "case-studies", label: "Case Studies" },
    { id: "benefits", label: "Benefits" }
  ];
  
  // Our Services
  const ourServices = [
    {
      id: 1,
      title: "Media Walls & Backdrops",
      description: "Custom designed and fabricated media walls with sponsor branding, perfect for step-and-repeat photo opportunities.",
      image: "/Cubana.png",
      features: [
        "Custom sizes from 2m to 10m wide",
        "Premium materials and printing",
        "Professional lighting integration"
      ]
    },
    {
      id: 2,
      title: "Premium Red Carpets",
      description: "High-quality red carpet materials with optional custom colors and branding for your entrance experience.",
      image: "/Ciroc.png",
      features: [
        "Premium stain-resistant materials",
        "Custom lengths and widths available",
        "Professional installation and removal"
      ]
    },
    {
      id: 3,
      title: "Branded Photo Experiences",
      description: "Interactive photo opportunities that create shareable branded content for your guests and sponsors.",
      image: "/Cubana.png",
      features: [
        "360° photo booths with branding",
        "Social media integration",
        "Instant printing and digital delivery"
      ]
    }
  ];
  
  // Additional service features
  const serviceFeatures = [
    {
      icon: <Star size={24} />,
      title: "Premium Materials",
      description: "We use only the highest quality materials for our red carpets and media walls, ensuring durability and a luxurious appearance."
    },
    {
      icon: <Camera size={24} />,
      title: "Photography-Optimized",
      description: "All our setups are designed with professional photography in mind, with perfect lighting and angles."
    },
    {
      icon: <Users size={24} />,
      title: "Experienced Team",
      description: "Our team has managed red carpet experiences for Nigeria's most prestigious events."
    }
  ];

  return (
    <div className="bg-white text-gray-900  py-16">
      {/* Hero section with gradient and pattern overlay */}
      <div className="relative bg-blue-900 py-10 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="carpet-gradient" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
                <stop offset="0%" stopColor="rgba(219, 39, 119, 0.2)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#carpet-gradient)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-3 text-white leading-tight transition-all duration-500 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Red Carpet Experiences <br className="hidden md:block" />
              That Make a Statement
            </h1>
            <p className={`text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Custom designed media walls, premium red carpets, and branded photo experiences for your events
            </p>
            <div className={`flex flex-row justify-center gap-4 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              <a 
                href="#services" 
                className="px-5 py-3 rounded-md text-base font-medium bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                Services
              </a>
              <a 
                href="/contact" 
                className="px-5 py-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      {isMobile && (
        <div className="sticky top-0 bg-white shadow-md z-40 transition-all duration-300">
          <div className="flex overflow-x-auto no-scrollbar py-2 px-2 border-b border-gray-100">
            {mobileTabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 mx-1 whitespace-nowrap text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Introduction Section - Simplified for Mobile */}
      <section className={`py-10 md:py-16 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className={`md:w-1/2 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                  Elevate Your Event's First Impression
                </h2>
                <p className="text-gray-700 mb-4">
                  The red carpet experience sets the tone for your entire event. We create custom designed experiences that make a statement and leave a lasting impression.
                </p>
                {/* Mobile-optimized tags */}
                {isMobile ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Premium Materials</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">15+ Years Experience</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Premium Materials</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Nationwide Service</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">15+ Years Experience</span>
                  </div>
                )}
              </div>
              <div className={`md:w-1/2 mt-4 md:mt-0 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/Cubana.png" 
                    alt="Red Carpet Event Setup"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                      <p className="text-white text-sm md:text-base font-medium">
                        Lagos Fashion Week Media Wall and Red Carpet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Services - Card Slider for Mobile */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Our Red Carpet Services
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              From awards shows to product launches, we create custom experiences that elevate your event
            </p>
          </div>
          
          {/* Mobile Card Carousel */}
          {isMobile ? (
            <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
              <div className="flex space-x-4 w-max">
                {ourServices.map((service, index) => (
                  <div 
                    key={service.id}
                    className="w-72 flex-shrink-0 snap-center bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        {service.description}
                      </p>
                      <ul className="space-y-1 mb-2 text-sm">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check size={14} className="text-blue-500 mr-1 mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scrolling indicator for mobile */}
             
            </div>
          ) : (
            // Desktop Grid
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ourServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Past Projects - Mobile Card Display */}
      <section id="projects" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Our Red Carpet Projects
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              See how we've transformed events across Nigeria with our custom red carpet experiences
            </p>
          </div>
          
          {/* Mobile Project Showcase */}
          {isMobile ? (
            <div className="relative pb-12">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video mb-4">
                <img 
                  src={redCarpetProjects[currentProject].image} 
                  alt={redCarpetProjects[currentProject].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                  <div className="p-4 text-white">
                    <div className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded mb-2">
                      {redCarpetProjects[currentProject].year}
                    </div>
                    <h3 className="font-bold text-lg">{redCarpetProjects[currentProject].title}</h3>
                    <p className="text-sm text-gray-200">{redCarpetProjects[currentProject].description}</p>
                    
                    <div className="flex items-center mt-2 text-white text-xs">
                      <Users size={12} className="mr-1" />
                      <span className="mr-3">{redCarpetProjects[currentProject].attendees}</span>
                      <MessageCircle size={12} className="mr-1" />
                      <span>{redCarpetProjects[currentProject].client}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-1">
                {redCarpetProjects.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${index === currentProject ? 'bg-blue-600' : 'bg-blue-200'}`}
                    onClick={() => setCurrentProject(index)}
                    aria-label={`View project ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            // Desktop Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {redCarpetProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap items-center text-gray-500 mb-4">
                      <div className="flex items-center mr-4 mb-2 sm:mb-0">
                        <Users size={16} className="mr-1" />
                        <span className="text-sm">{project.attendees}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={16} className="mr-1" />
                        <span className="text-sm">{project.client}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      <span>View Project</span>
                      <ArrowRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Case Studies - Mobile-Friendly Carousel */}
      <section id="case-studies" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Case Studies
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              See how our red carpet experiences have helped clients achieve their event goals
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Simplified Case Study on Mobile */}
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {caseStudies.map((study) => (
                  <div key={study.id} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <div className="md:flex flex-col md:flex-row">
                        <div className="md:w-2/5">
                          <div className="h-56 md:h-full relative">
                            <img 
                              src={study.image} 
                              alt={study.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                              <span className="inline-block px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded mb-2">
                                {study.year}
                              </span>
                              <h3 className="text-xl font-bold text-white">{study.title}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-3/5 p-4 md:p-6">
                          <div className="hidden md:block mb-4">
                            <span className="inline-block px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded mb-2">
                              {study.year}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900">{study.title}</h3>
                          </div>
                          <p className="text-gray-700 mb-4">{study.description}</p>
                          
                          <div className="space-y-3 mb-4">
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Challenge</h4>
                              <p className="text-sm md:text-base text-gray-700">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Solution</h4>
                              <p className="text-sm md:text-base text-gray-700">{study.solution}</p>
                            </div>
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Result</h4>
                              <p className="text-sm md:text-base text-gray-700">{study.result}</p>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-gray-700 text-sm">
                              <span className="font-medium">Client:</span> {study.client}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel controls */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-2 items-center">
                {caseStudies.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to case study ${index + 1}`}
                  ></button>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  aria-label="Previous case study"
                >
                  <ChevronLeft size={isMobile ? 16 : 20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  aria-label="Next case study"
                >
                  <ChevronRight size={isMobile ? 16 : 20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits - Icon Grid for Mobile */}
      <section id="benefits" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Why Choose Our Red Carpet Services
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              What sets our red carpet experiences apart
            </p>
          </div>
          
          {/* Mobile Benefits Compact Grid */}
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-6'} max-w-5xl mx-auto`}>
            {serviceFeatures.map((benefit, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-sm border border-gray-100 ${isMobile ? 'p-4' : 'p-6'}`}
              >
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3`}>
                  {benefit.icon}
                </div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-2`}>{benefit.title}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-700`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-10 md:py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'px-2' : ''}`}>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-3`}>
              Ready to Create a Memorable Red Carpet Experience?
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-blue-100 mb-6 max-w-3xl mx-auto`}>
              Let's collaborate to design a red carpet solution that elevates your event
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href="/contact" 
                className={`px-5 py-3 rounded-md ${isMobile ? 'text-sm' : 'text-lg'} font-medium bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center`}
              >
                <span>Request a Quote</span>
                <ArrowRight size={isMobile ? 16 : 20} className="ml-2" />
              </a>
              
              <a 
                href="tel:+2348012345678" 
                className={`px-5 py-3 rounded-md ${isMobile ? 'text-sm' : 'text-lg'} font-medium bg-blue-800 text-white hover:bg-blue-700 transition-all duration-300 flex items-center justify-center`}
              >
                <span>Call Us</span>
                <Phone size={isMobile ? 16 : 20} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating CTA Button */}
      {renderFloatingCTA()}
      
      {/* Add mobile-specific styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Custom animations */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default RedCarpetEvent;