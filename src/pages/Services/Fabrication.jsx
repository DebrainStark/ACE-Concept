import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Star, Wrench, Settings, ShieldCheck, ChevronDown, ChevronUp, Check, Phone, Zap, Layers, Award, MessageCircle, PenTool, Box, Truck } from "lucide-react";

const CustomFabrication = () => {
  // Move isMobile declaration before usage to avoid reference errors
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [activeFaq, setActiveFaq] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
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
        setCurrentProject((prev) => (prev + 1) % 4); // 4 gallery items
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  // FAQ data
  const faqItems = [
    {
      question: "What types of custom fabrication services do you offer?",
      answer: "We offer a comprehensive range of custom fabrication services including modular exhibition stands, custom display units, themed environments, product displays, bespoke furniture, experiential installations, and branded retail fixtures."
    },
    {
      question: "How long does custom fabrication typically take?",
      answer: "Small to medium projects typically require 2-4 weeks from concept approval to completion, while larger installations may take 6-8 weeks. We always provide a detailed timeline during the consultation phase."
    },
    {
      question: "Can you handle both design and fabrication?",
      answer: "Yes, we offer end-to-end services including concept design, 3D visualization, engineering, fabrication, and installation."
    },
    {
      question: "Do you handle installation and logistics?",
      answer: "Absolutely. We provide comprehensive installation services nationwide with experienced installation teams."
    },
    {
      question: "What materials do you work with?",
      answer: "We work with wood, metals, acrylics, plastics, composites, fabric, glass, and eco-friendly alternatives."
    }
  ];
  
  // Services
  const fabricationServices = [
    {
      id: 1,
      title: "Exhibition Stands",
      description: "Custom designed exhibition stands that create impact at trade shows and expos.",
      image: "/Cubana.png",
      features: [
        "Modular designs",
        "Integrated technology",
        "Custom lighting"
      ]
    },
    {
      id: 2,
      title: "Retail Displays",
      description: "Bespoke retail fixtures that showcase products and enhance customer experience.",
      image: "/Ciroc.png",
      features: [
        "Product showcases",
        "Point of sale displays",
        "Shop-in-shop installations"
      ]
    },
    {
      id: 3,
      title: "Experiential Installations",
      description: "Immersive branded environments that create memorable experiences.",
      image: "/Cubana.png",
      features: [
        "Interactive activations",
        "Photo opportunities",
        "Pop-up environments"
      ]
    },
    {
      id: 4,
      title: "Corporate Environments",
      description: "Custom elements for corporate spaces and branded environments.",
      image: "/Ciroc.png",
      features: [
        "Reception features",
        "Custom furniture",
        "Brand experience centers"
      ]
    }
  ];
  
  // Process steps
  const processSteps = [
    {
      id: 1,
      title: "Consultation",
      description: "Understanding your objectives, requirements, and vision.",
      icon: <MessageCircle size={24} className="text-blue-600" />
    },
    {
      id: 2,
      title: "Design",
      description: "Creating concepts that align with your brief.",
      icon: <PenTool size={24} className="text-blue-600" />
    },
    {
      id: 3,
      title: "Visualization",
      description: "Developing detailed 3D renders and technical drawings.",
      icon: <Box size={24} className="text-blue-600" />
    },
    {
      id: 4,
      title: "Fabrication",
      description: "Our skilled craftsmen bring designs to life in our workshop.",
      icon: <Wrench size={24} className="text-blue-600" />
    },
    {
      id: 5,
      title: "Installation",
      description: "Careful transport and assembly of your custom elements on-site.",
      icon: <Truck size={24} className="text-blue-600" />
    }
  ];
  
  // Benefits features
  const benefitsFeatures = [
    {
      icon: <Wrench size={24} />,
      title: "Expert Craftsmanship",
      description: "Skilled craftsmen with years of experience."
    },
    {
      icon: <Settings size={24} />,
      title: "Custom Solutions",
      description: "Built to your specific requirements and brand identity."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Quality Materials",
      description: "Durable materials for longevity and appearance."
    },
    {
      icon: <Zap size={24} />,
      title: "Innovative Techniques",
      description: "Combining traditional craftsmanship with modern technology."
    }
  ];

  // Mobile navigation tabs
  const mobileTabs = [
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "benefits", label: "Benefits" },
    { id: "gallery", label: "Gallery" },
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
            <MessageCircle size={24} />
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white text-gray-900 py-16">
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
              <linearGradient id="fab-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0.3)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#fab-gradient)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-3 text-white leading-tight transition-all duration-500 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Custom Fabrication <br className="hidden md:block" />
              For Impactful Experiences
            </h1>
            <p className={`text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
              Bespoke design and fabrication services for exhibitions, events, retail, and brands
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
                  Bringing Your Vision To Life
                </h2>
                <p className="text-gray-700 mb-4">
                  We combine creative design with expert craftsmanship to create custom fabricated elements that elevate your brand, event, or space.
                </p>
                {/* Mobile-optimized tags */}
                {isMobile ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">In-House Production</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Quality Materials</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">15+ Yrs Experience</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">In-House Production</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Quality Materials</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">Nationwide Service</span>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">15+ Years Experience</span>
                  </div>
                )}
              </div>
              <div className={`md:w-1/2 mt-4 md:mt-0 transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/Cubana.png" 
                    alt="Custom Fabrication Workshop"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                      <p className="text-white text-sm md:text-base font-medium">
                        Our fabrication workshop in Lagos, Nigeria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Fabrication Services - Card Slider for Mobile */}
      <section id="services" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Custom Fabrication Services
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Expert design and production for all your needs
            </p>
          </div>
          
          {/* Mobile Card Carousel */}
          {isMobile ? (
            <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
              <div className="flex space-x-4 w-max">
                {fabricationServices.map((service, index) => (
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
              {fabricationServices.map((service, index) => (
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
              Our Fabrication Process
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
            // Desktop Grid
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                        <span className="font-bold">{step.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
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
      <section id="benefits" className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Why Choose Us
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              What sets our custom fabrication apart
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
      
      {/* Project Gallery - Full-width Swipeable Cards for Mobile */}
      <section id="gallery" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Recent Projects
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Examples of our custom fabrication work
            </p>
          </div>
          
          {/* Mobile Gallery - Immersive Full-Width Swiper */}
          {isMobile ? (
            <div className="relative pb-12">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video mb-4">
                <img 
                  src={currentProject % 2 === 0 ? "/Ciroc.png" : "/Cubana.png"} 
                  alt={`Project ${currentProject + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">Project {currentProject + 1}</h3>
                    <p className="text-sm text-gray-200">
                      {currentProject % 2 === 0 ? 'Custom retail display with integrated lighting' : 'Event activation with branded elements'} 
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2, 3].map((index) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={item % 2 === 0 ? "/Ciroc.png" : "/Cubana.png"} 
                    alt={`Fabrication project ${item}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">Project {item}</h3>
                      <p className="text-sm">Custom fabrication for {item % 2 === 0 ? 'retail display' : 'event activation'}</p>
                    </div>
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
              <span>View Portfolio</span>
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
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
                Common questions about our services
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
              Ready to Start Your Project?
            </h2>
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-blue-100 mb-6 max-w-3xl mx-auto`}>
              Let's collaborate to create custom fabricated elements that elevate your brand
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

export default CustomFabrication;