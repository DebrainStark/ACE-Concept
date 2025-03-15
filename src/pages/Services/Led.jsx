import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Lightbulb, Zap, Clock, ChevronDown, ChevronUp, Check, Phone, BarChart3, Settings, ShieldCheck, Users, Eye, Sparkles, MessageCircle } from "lucide-react";

const LedInstallation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [activeFaq, setActiveFaq] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
  
  // FAQ toggle
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  
  // Check if we're on mobile
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Mobile gallery rotation
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  // FAQ data
  const faqItems = [
    {
      question: "What types of LED installations do you offer?",
      answer: "We offer architectural lighting, event lighting, retail display lighting, LED walls and screens, custom LED signage, and interactive lighting installations for both permanent and temporary setups."
    },
    {
      question: "How energy-efficient are your LED installations?",
      answer: "Our LED solutions consume up to 80% less electricity than traditional lighting with a significantly longer lifespan (25,000-50,000 hours), reducing both environmental impact and operating costs."
    },
    {
      question: "Can you create custom LED designs?",
      answer: "Absolutely! We can create bespoke LED installations in virtually any shape, size, or configuration using various LED technologies including pixel-mapped LEDs, flexible LED strips, and modular panels."
    },
    {
      question: "Do you handle both indoor and outdoor installations?",
      answer: "Yes, we specialize in both indoor and outdoor LED installations with weather-resistant components for outdoor use and aesthetically-focused solutions for indoor environments."
    },
    {
      question: "What is the installation process like?",
      answer: "We start with consultation and site assessment, followed by design development and technical planning. Our technicians then handle mounting, wiring, programming and testing with minimal disruption."
    }
  ];
  
  // LED Services
  const ledServices = [
    {
      id: 1,
      title: "Architectural LED Lighting",
      description: "Transform buildings and spaces with stunning LED lighting that enhances aesthetics and atmosphere.",
      image: "/Cubana.png",
      features: [
        "Facade lighting",
        "Color-changing capabilities",
        "Energy-efficient designs"
      ]
    },
    {
      id: 2,
      title: "LED Video Walls & Screens",
      description: "High-resolution LED displays for commercial, retail, and event environments.",
      image: "/Ciroc.png",
      features: [
        "Custom-sized walls",
        "HD displays",
        "Content management"
      ]
    },
    {
      id: 3,
      title: "Event & Stage Lighting",
      description: "Dynamic LED solutions for events and performances that create atmosphere.",
      image: "/Cubana.png",
      features: [
        "Programmable shows",
        "DMX-controlled systems",
        "Temporary installations"
      ]
    },
    {
      id: 4,
      title: "Retail & Display Lighting",
      description: "Strategic lighting for retail that showcases products and enhances experience.",
      image: "/Ciroc.png",
      features: [
        "Product highlighting",
        "Storefront lighting",
        "Display illumination"
      ]
    },
    {
      id: 5,
      title: "Custom LED Signage",
      description: "Eye-catching custom LED signs and logos that increase brand visibility.",
      image: "/Cubana.png",
      features: [
        "3D illuminated logos",
        "Backlit signage",
        "Halo-lit channel letters"
      ]
    },
    {
      id: 6,
      title: "Interactive LED Installations",
      description: "Engaging installations that respond to movement, touch, or sound.",
      image: "/Ciroc.png",
      features: [
        "Motion-activated displays",
        "Touch-responsive surfaces",
        "Sound-reactive lighting"
      ]
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      id: 1,
      title: "Consultation",
      description: "We understand your objectives, space requirements, and aesthetic vision.",
      icon: <MessageCircle size={24} className="text-blue-600" />
    },
    {
      id: 2,
      title: "Design",
      description: "Our team creates custom LED lighting designs tailored to your needs.",
      icon: <Lightbulb size={24} className="text-blue-600" />
    },
    {
      id: 3,
      title: "Technical Planning",
      description: "We develop detailed specifications for power, control systems, and installation.",
      icon: <Settings size={24} className="text-blue-600" />
    },
    {
      id: 4,
      title: "Installation",
      description: "Our technicians ensure clean wiring, secure mounting, and system integration.",
      icon: <Zap size={24} className="text-blue-600" />
    },
    {
      id: 5,
      title: "Programming",
      description: "We program lighting sequences, effects, and thoroughly test all systems.",
      icon: <Sparkles size={24} className="text-blue-600" />
    }
  ];
  
  // Benefits features
  const benefitsFeatures = [
    {
      icon: <Zap size={24} />,
      title: "Energy Efficient",
      description: "80% less energy use than traditional lighting, reducing costs and environmental impact."
    },
    {
      icon: <Clock size={24} />,
      title: "Long Lifespan",
      description: "25,000 to 50,000 hours of operation, reducing maintenance and replacement costs."
    },
    {
      icon: <Eye size={24} />,
      title: "Visual Impact",
      description: "Create stunning visual experiences that capture attention and leave lasting impressions."
    },
    {
      icon: <Settings size={24} />,
      title: "Customizable",
      description: "Adaptable brightness, colors, and programming to match your specific needs."
    }
  ];
  
  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Lagos Hotel Facade",
      category: "Architectural",
      description: "Dynamic LED facade lighting for a premium hotel in Victoria Island",
      image: "/Cubana.png"
    },
    {
      id: 2,
      title: "Retail Brand Experience",
      category: "Retail",
      description: "Interactive LED installation for flagship store opening",
      image: "/Ciroc.png"
    },
    {
      id: 3,
      title: "Corporate Headquarters",
      category: "Architectural",
      description: "Interior and exterior LED lighting system for corporate offices",
      image: "/Cubana.png"
    },
    {
      id: 4,
      title: "Music Festival Stage",
      category: "Event",
      description: "Programmable LED stage design for annual music festival",
      image: "/Ciroc.png"
    }
  ];
  
  // Mobile navigation tabs
  const mobileTabs = [
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "benefits", label: "Benefits" },
    { id: "gallery", label: "Projects" },
    { id: "faq", label: "FAQ" }
  ];
  
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
            <Lightbulb size={24} />
          </a>
        </div>
      );
    }
    return null;
  };

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
              <radialGradient id="light-source" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="50%" cy="0%" r="50%" fill="url(#light-source)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-3 text-white leading-tight transition-all duration-500 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              LED Installation <br className="hidden md:block" />
              & Lighting Solutions
            </h1>
            <p className={`text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Transforming spaces with innovative LED lighting design and installation
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
                  Illuminate Your Space With Creative LED Solutions
                </h2>
                <p className="text-gray-700 mb-4">
                  We design and install innovative LED lighting solutions that transform spaces, create atmosphere, and deliver impact for brands, venues, and events.
                </p>
                {/* Mobile-optimized tags */}
                {isMobile ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Energy Efficient</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Full Installation</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Energy Efficient</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Full Installation</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Technical Support</span>
                  </div>
                )}
              </div>
              <div className={`md:w-1/2 mt-4 md:mt-0 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/Cubana.png" 
                    alt="LED Installation"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                      <p className="text-white text-sm md:text-base font-medium">
                        Custom LED installation for brand experience
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our LED Services - Card Slider for Mobile */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Our LED Services
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Creative lighting solutions for various environments
            </p>
          </div>
          
          {/* Mobile Card Carousel */}
          {isMobile ? (
            <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
              <div className="flex space-x-4 w-max">
                {ledServices.map((service, index) => (
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
             
            </div>
          ) : (
            // Desktop Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ledServices.map((service, index) => (
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
      
      {/* Our Process - Interactive Process Steps for Mobile */}
      <section id="process" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Our LED Installation Process
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              From concept to completion
            </p>
          </div>
          
          {/* Mobile Process Steps - Vertical Timeline */}
          {isMobile ? (
            <div className="relative max-w-sm mx-auto pl-8 pb-8">
              {/* Timeline line */}
              <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-blue-200 z-0"></div>
              
              {processSteps.map((step, index) => (
                <div key={step.id} className="mb-6 relative">
                  {/* Timeline circle */}
                  <div className="absolute left-[-28px] w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white z-10">
                    {step.id}
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="text-blue-600 mr-3">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Timeline
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Process timeline (desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
                
                <div className="space-y-12 md:space-y-0">
                  {/* Consultation & Design */}
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right md:pr-8 pb-8 md:pb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation & Design</h3>
                      <p className="text-gray-700">
                        We meet to understand your objectives and space, then create custom LED lighting designs tailored to your vision.
                      </p>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                    <div className="md:pl-8"></div>
                  </div>
                  
                  {/* Technical Planning */}
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:pr-8"></div>
                    <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                    <div className="md:pl-8 pb-8 md:pb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Planning</h3>
                      <p className="text-gray-700">
                        Our engineers develop detailed technical specifications, including power requirements and control systems.
                      </p>
                    </div>
                  </div>
                  
                  {/* Installation */}
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:text-right md:pr-8 pb-8 md:pb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Installation</h3>
                      <p className="text-gray-700">
                        Our technicians carefully install all components, ensuring clean wiring, secure mounting, and proper integration.
                      </p>
                    </div>
                    <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                    <div className="md:pl-8"></div>
                  </div>
                  
                  {/* Programming */}
                  <div className="md:grid md:grid-cols-2 md:gap-8 relative">
                    <div className="md:pr-8"></div>
                    <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                    <div className="md:pl-8 pb-8 md:pb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Programming & Testing</h3>
                      <p className="text-gray-700">
                        We program lighting sequences, effects, and controls, then thoroughly test all systems to ensure optimal performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Benefits - Icon Grid for Mobile */}
      <section id="benefits" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Benefits of LED Technology
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Why choose LED lighting for your space
            </p>
          </div>
          
          {/* Mobile Benefits Compact Grid */}
          <div className={`grid grid-cols-2 ${isMobile ? 'gap-3' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'} max-w-5xl mx-auto`}>
            {benefitsFeatures.map((benefit, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-sm border border-gray-100 ${isMobile ? 'p-3 text-center' : 'p-6'}`}
              >
                <div className={`${isMobile ? 'w-10 h-10 mx-auto' : 'w-12 h-12'} bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3`}>
                  {benefit.icon}
                </div>
                <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold text-gray-900 mb-2`}>{benefit.title}</h3>
                <p className={`${isMobile ? 'text-xs' : 'text-base'} text-gray-700`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Projects - Immersive Mobile Gallery */}
      <section id="gallery" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Featured LED Projects
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Some of our recent LED installations
            </p>
          </div>
          
          {/* Mobile Gallery - Immersive Card with Auto-Rotation */}
          {isMobile ? (
            <div className="relative pb-12">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video mb-4">
                <img 
                  src={portfolioItems[currentSlide].image} 
                  alt={portfolioItems[currentSlide].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                  <div className="p-4 text-white">
                    <div className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded mb-2">
                      {portfolioItems[currentSlide].category}
                    </div>
                    <h3 className="font-bold text-lg">{portfolioItems[currentSlide].title}</h3>
                    <p className="text-sm text-gray-200">{portfolioItems[currentSlide].description}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-1">
                {portfolioItems.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-blue-200'}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`View project ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            // Desktop Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {portfolioItems.map((project, index) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    
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
      
      {/* FAQ Section - Compact Accordion for Mobile */}
      <section id="faq" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                FAQ
              </h2>
              <p className="text-gray-700">
                Common questions about our LED services
              </p>
            </div>
            
            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full px-4 py-3 flex justify-between items-center text-left focus:outline-none ${isMobile ? 'text-sm' : ''}`}
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>{faq.question}</h3>
                    <div className="ml-2 flex-shrink-0 text-gray-500">
                      {activeFaq === index ? (
                        <ChevronUp size={isMobile ? 16 : 20} />
                      ) : (
                        <ChevronDown size={isMobile ? 16 : 20} />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-content-${index}`}
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      activeFaq === index 
                        ? 'max-h-40 pb-4 opacity-100' 
                        : 'max-h-0 pb-0 opacity-0'
                    } ${isMobile ? 'text-sm' : ''}`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Compact for Mobile */}
      <section className="py-10 md:py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'px-2' : ''}`}>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-3`}>
              Ready to Transform Your Space with Light?
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-blue-100 mb-6 max-w-3xl mx-auto`}>
              Contact us to discuss your LED lighting project and illuminate your space
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

        /* Blue light glow effect for LED elements */
        .led-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LedInstallation;