import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Scissors, Layers, ChevronDown, ChevronUp, Check, Phone, BarChart3, Settings, ShieldCheck, FileText, Maximize, Sparkles, MessageCircle } from "lucide-react";

const LaserCutSignature = () => {
  // Move isMobile declaration before usage to avoid reference errors
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("services");
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  
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
  
  // Mobile gallery rotation
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % portfolioItems.length);
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
  
  // FAQ data
  const faqItems = [
    {
      question: "What materials can you laser cut for signature pieces?",
      answer: "We work with acrylic, wood (MDF, plywood, hardwoods), metal (aluminum, stainless steel), leather, paper, and specialty materials like dichroic acrylic. Each offers different aesthetic qualities suitable for various applications."
    },
    {
      question: "What is the typical turnaround time?",
      answer: "Simple pieces are ready within 3-5 business days, while more complex orders typically take 7-10 business days from design approval. We offer rush services for urgent projects at an additional fee."
    },
    {
      question: "Can you create custom designs from my logo?",
      answer: "Absolutely! We specialize in transforming logos and concepts into stunning laser-cut signature pieces. Our design team works with you to optimize your design while maintaining its integrity."
    },
    {
      question: "What is the maximum size for laser-cut pieces?",
      answer: "Our standard laser cutting bed accommodates pieces up to 1200mm x 900mm. For larger signature pieces, we create modular designs that assemble into larger installations."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we provide professional installation services for all our signature walls and larger pieces. Our team handles everything from site preparation to final mounting."
    }
  ];
  
  // Mobile navigation tabs
  const mobileTabs = [
    { id: "services", label: "Services" },
    { id: "materials", label: "Materials" },
    { id: "process", label: "Process" },
    { id: "projects", label: "Projects" },
    { id: "faq", label: "FAQ" }
  ];
  
  // Laser Cut Services
  const laserCutServices = [
    {
      id: 1,
      title: "Custom Logo Signatures",
      description: "Transform your brand logo into a striking laser-cut signature piece for reception areas, events, or brand activations.",
      image: "/Cubana.png",
      features: [
        "Precision cut from premium materials",
        "Custom sizes from 30cm to 3m wide",
        "Optional backlighting integration"
      ]
    },
    {
      id: 2,
      title: "Decorative Panels & Screens",
      description: "Elegant laser-cut panels and screens that create visual interest, divide spaces, or serve as artistic focal points.",
      image: "/Ciroc.png",
      features: [
        "Custom patterns and designs",
        "Room dividers and privacy screens",
        "Backlit feature walls"
      ]
    },
    {
      id: 3,
      title: "Event Signature Backdrops",
      description: "Eye-catching laser-cut backdrops that create a memorable brand presence at events, launches, and photo opportunities.",
      image: "/Cubana.png",
      features: [
        "Lightweight and transportable",
        "Modular design for easy setup",
        "Integrated lighting options"
      ]
    },
    {
      id: 4,
      title: "Architectural Elements",
      description: "Distinctive architectural features including ceiling installations, wall applications, and decorative elements for interiors.",
      image: "/Ciroc.png",
      features: [
        "Custom ceiling features",
        "Wall art and dimensional elements",
        "Wayfinding and signage systems"
      ]
    }
  ];
  
  // Material options
  const materialOptions = [
    {
      title: "Premium Acrylic",
      description: "Versatile material available in transparent, colored, or mirrored finishes. Ideal for illuminated signs and modern aesthetics.",
      image: "/Cubana.png"
    },
    {
      title: "Hardwoods",
      description: "Natural elegance with oak, walnut, or maple. Perfect for warm, organic signature pieces with unique grain patterns.",
      image: "/Ciroc.png"
    },
    {
      title: "Metal",
      description: "Stainless steel, aluminum, or brass options for sophisticated, durable signature pieces with industrial appeal.",
      image: "/Cubana.png"
    },
    {
      title: "Composite Materials",
      description: "Multi-layered materials that combine different colors and textures for distinctive visual effects.",
      image: "/Ciroc.png"
    }
  ];
  
  // Design process steps
  const processSteps = [
    {
      id: 1,
      title: "Consultation & Design",
      description: "We start by understanding your vision, brand, and space, then develop custom concepts with detailed visualizations.",
      icon: <MessageCircle size={24} className="text-blue-600" />
    },
    {
      id: 2,
      title: "Precision Fabrication",
      description: "Using advanced laser technology, we cut and fabricate your design in chosen materials with meticulous finishing.",
      icon: <Scissors size={24} className="text-blue-600" />
    },
    {
      id: 3,
      title: "Professional Installation",
      description: "Our team carefully transports and installs your signature piece, ensuring perfect placement and visual impact.",
      icon: <Maximize size={24} className="text-blue-600" />
    }
  ];
  
  // Benefits features
  const benefitsFeatures = [
    {
      icon: <Scissors size={24} />,
      title: "Precision Detailing",
      description: "Intricate details and fine cuts that traditional methods cannot achieve, resulting in stunning signature pieces."
    },
    {
      icon: <Settings size={24} />,
      title: "Material Versatility",
      description: "Work with acrylic, wood, metals, and composites to achieve your desired aesthetic."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Consistent Quality",
      description: "Computer-controlled precision ensures perfect edges and consistent detailing every time."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Finishing Options",
      description: "Enhance your pieces with various finishes, backlighting, and decorative treatments."
    }
  ];
  
  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Corporate HQ Reception",
      category: "Corporate",
      description: "Illuminated 3D logo signature for bank headquarters",
      image: "/Cubana.png"
    },
    {
      id: 2,
      title: "Fashion Brand Launch",
      category: "Event",
      description: "Modular backdrop for luxury fashion event",
      image: "/Ciroc.png"
    },
    {
      id: 3,
      title: "Restaurant Feature Wall",
      category: "Hospitality",
      description: "Custom pattern screen for upscale dining experience",
      image: "/Cubana.png"
    },
    {
      id: 4,
      title: "Boutique Hotel Signage",
      category: "Hospitality",
      description: "Multi-layered acrylic signage system with lighting",
      image: "/Ciroc.png"
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
              <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#laser-gradient)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-3 text-white leading-tight transition-all duration-500 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Laser-Cut Signature <br className="hidden md:block" />
              Pieces & Brand Elements
            </h1>
            <p className={`text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Custom designed and precision-cut signature pieces that make a statement
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
                  Make Your Brand Stand Out with Signature Laser-Cut Elements
                </h2>
                <p className="text-gray-700 mb-4">
                  We create custom laser-cut signature pieces that become focal points, conversation starters, and powerful brand statements for your space or event.
                </p>
                {/* Mobile-optimized tags */}
                {isMobile ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Precision Cutting</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Premium Materials</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Precision Cutting</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Custom Design</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Premium Materials</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Professional Installation</span>
                  </div>
                )}
              </div>
              <div className={`md:w-1/2 mt-4 md:mt-0 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/Cubana.png" 
                    alt="Laser-Cut Signature Piece"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                      <p className="text-white text-sm md:text-base font-medium">
                        Custom laser-cut logo wall for corporate reception
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Laser-Cut Services - Card Slider for Mobile */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Laser-Cut Signature Services
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Custom laser-cut solutions for various applications and environments
            </p>
          </div>
          
          {/* Mobile Card Carousel */}
          {isMobile ? (
            <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
              <div className="flex space-x-4 w-max">
                {laserCutServices.map((service, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laserCutServices.map((service, index) => (
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
      
      {/* Material Options - Compact Cards for Mobile */}
      <section id="materials" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Material Options
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Choose from premium materials to achieve your desired aesthetic
            </p>
          </div>
          
          {/* Mobile Material Cards */}
          {isMobile ? (
            <div className="space-y-4">
              {materialOptions.map((material, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center">
                    <div className="w-1/3 h-24">
                      <img 
                        src={material.image} 
                        alt={material.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/3 p-3">
                      <h3 className="text-base font-bold text-gray-900 mb-1">{material.title}</h3>
                      <p className="text-xs text-gray-700">
                        {material.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Material Cards
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {materialOptions.map((material, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto">
                      <img 
                        src={material.image} 
                        alt={material.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{material.title}</h3>
                      <p className="text-gray-700">
                        {material.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* How We Work - Interactive Process Steps for Mobile */}
      <section id="process" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Our Design & Production Process
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              From concept to installation, we manage every step
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
            // Desktop Grid
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {processSteps.map((step, index) => (
                  <div key={step.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                      <span className="text-lg font-bold">{step.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Benefits - Icon Grid for Mobile */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Why Choose Laser-Cut Signature Pieces
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The advantages of custom laser-cut elements
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
      
      {/* Recent Projects - Mobile Card Gallery */}
      <section id="projects" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Featured Laser-Cut Projects
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Some of our recent signature pieces and installations
            </p>
          </div>
          
          {/* Mobile Project Showcase */}
          {isMobile ? (
            <div className="relative pb-12">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video mb-4">
                <img 
                  src={portfolioItems[currentProject].image} 
                  alt={portfolioItems[currentProject].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                  <div className="p-4 text-white">
                    <div className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded mb-2">
                      {portfolioItems[currentProject].category}
                    </div>
                    <h3 className="font-bold text-lg">{portfolioItems[currentProject].title}</h3>
                    <p className="text-sm text-gray-200">{portfolioItems[currentProject].description}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-1">
                {portfolioItems.map((_, index) => (
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
          
          <div className="mt-8 text-center">
            <a 
              href="/portfolio" 
              className="px-5 py-2 rounded-md text-base font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300 inline-flex items-center"
            >
              <span>View All Projects</span>
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Compact Accordion for Mobile */}
      <section id="faq" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700">
                Common questions about our laser-cut signature services
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
              Ready to Create Your Custom Signature Piece?
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-blue-100 mb-6 max-w-3xl mx-auto`}>
              Contact us to discuss your laser-cut project and transform your brand
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

export default LaserCutSignature;