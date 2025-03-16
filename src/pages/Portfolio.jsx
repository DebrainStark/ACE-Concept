import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Filter, Star, Plus, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filterRef = useRef(null);
  const featuredCarouselRef = useRef(null);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  
  // Detect window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Project filtering
  const filters = [
    { id: "all", name: "All Projects" },
    { id: "redcarpet", name: "Red Carpet" },
    { id: "fabrication", name: "Fabrication" },
    { id: "signage", name: "Event Signage" },
    { id: "led", name: "LED Installations" }
  ];
  
  // Portfolio projects
  const projects = [
    {
      id: 1,
      title: "Lagos Fashion Week Media Wall",
      category: "redcarpet",
      description: "Custom fabricated media wall with integrated LED lighting for Nigeria's premier fashion event",
      image: "Cubana.png",
      tags: ["Media Wall", "Red Carpet", "Fashion Event"],
      client: "Lagos Fashion Week",
      year: "2024"
    },
    {
      id: 2,
      title: "Custom LED Stage Backdrop",
      category: "led",
      description: "Interactive LED display wall for corporate annual conference with dynamic content management",
      image: "Cubana.png",
      tags: ["LED Wall", "Corporate", "Interactive"],
      client: "NigeriaBank Ltd",
      year: "2023",
      featured: true
    },
    {
      id: 3,
      title: "Music Awards Branding Package",
      category: "signage",
      description: "Comprehensive event signage and wayfinding system for major music awards ceremony",
      image: "Cubana.png",
      tags: ["Signage", "Awards", "Branding"],
      client: "Nigeria Music Awards",
      year: "2023"
    },
    {
      id: 4,
      title: "Product Launch Stage Design",
      category: "fabrication",
      description: "Custom stage with integrated product display pedestals and dynamic lighting",
      image: "Cubana.png",
      tags: ["Stage Design", "Product Launch", "Fabrication"],
      client: "TechNigeria",
      year: "2024",
      featured: true
    },
    {
      id: 5,
      title: "Film Festival Red Carpet Experience",
      category: "redcarpet",
      description: "Premium red carpet setup with sponsor integration and photo backdrop",
      image: "Cubana.png",
      tags: ["Red Carpet", "Film Festival", "VIP"],
      client: "Lagos International Film Festival",
      year: "2023"
    },
    {
      id: 6,
      title: "Corporate Event LED Totems",
      category: "led",
      description: "Series of programmable LED totems for event wayfinding and information display",
      image: "Ciroc.png",
      tags: ["LED", "Corporate Event", "Wayfinding"],
      client: "Global Finance Summit",
      year: "2024"
    },
    {
      id: 7,
      title: "Fashion Brand Pop-up Store",
      category: "fabrication",
      description: "Custom fabricated pop-up retail environment with branded fixtures",
      image: "Cubana.png",
      tags: ["Retail", "Pop-up", "Fabrication"],
      client: "Lagos Street Fashion",
      year: "2023"
    },
    {
      id: 8,
      title: "Wedding Event Signage Suite",
      category: "signage",
      description: "Comprehensive signage package including entrance, table numbers, and directional signs",
      image: "Ciroc.png",
      tags: ["Wedding", "Signage", "Custom"],
      client: "Private Client",
      year: "2024"
    },
    {
      id: 9,
      title: "Sports Awards Trophy Stage",
      category: "fabrication",
      description: "Custom stage with integrated LED screens and trophy presentation platform",
      image: "Cubana.png",
      tags: ["Sports", "Awards", "Stage Design"],
      client: "Nigeria Sports Authority",
      year: "2023"
    },
    {
      id: 10,
      title: "Charity Gala Media Backdrop",
      category: "redcarpet",
      description: "Sponsor-integrated media wall with premium finishes for high-end charity event",
      image: "Ciroc.png",
      tags: ["Charity", "Media Wall", "Gala"],
      client: "Children's Foundation Nigeria",
      year: "2024"
    },
    {
      id: 11,
      title: "Conference LED Data Dashboard",
      category: "led",
      description: "Real-time data visualization LED wall for financial conference",
      image: "Cubana.png",
      tags: ["Data Viz", "Conference", "Interactive"],
      client: "West Africa Finance Forum",
      year: "2023",
      featured: true
    },
    {
      id: 12,
      title: "Music Festival Entrance Arch",
      category: "signage",
      description: "Large-scale entrance structure with integrated lighting and sponsor branding",
      image: "Cubana.png",
      tags: ["Festival", "Entrance", "Branding"],
      client: "Lagos Music Festival",
      year: "2024"
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  
  // Animation on page load with improved stability
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scroll for sticky filter with throttling for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (filterRef.current) {
            const filterPosition = filterRef.current.getBoundingClientRect().top;
            setIsFilterSticky(filterPosition <= 0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to load more projects
  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, filteredProjects.length));
  };
  
  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setVisibleItems(6);
    setIsFilterOpen(false);
    
    // Reset carousel position
    setActiveSlide(0);
    
    // Scroll back to top of portfolio section if we're below it
    if (filterRef.current && window.scrollY > filterRef.current.offsetTop) {
      window.scrollTo({
        top: filterRef.current.offsetTop - 10,
        behavior: 'smooth'
      });
    }
  };

  // Carousel navigation
  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setActiveSlide(prev => prev === 0 ? featuredProjects.length - 1 : prev - 1);
  };

  // Open project modal on mobile
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close project modal
  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Check if we're on mobile
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className="bg-white text-gray-900 py-16">
      {/* Enhanced header with image */}
      <div className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="Hero2.png" 
            alt="Portfolio header background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/90"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
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
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Header content */}
        <div className="relative container mx-auto px-4 md:px-6 z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              {isMobile ? "Showcasing our innovative branded experiences" : "Showcasing innovative branded experiences that elevate our clients' presence"}
            </p>
            
            {/* Optional animated indicator */}
            <div className="mt-8 animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-white opacity-70">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Bar - Mobile drawer and desktop inline */}
      <div 
        ref={filterRef}
        className={`py-3 md:py-4 border-b transition-all duration-300 ${
          isFilterSticky 
            ? 'sticky top-0 z-30 bg-white shadow-sm' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {isMobile ? (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {filters.find(f => f.id === activeFilter)?.name || 'All Projects'}
              </h2>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-800 text-base font-medium"
              >
                <Filter size={18} className="mr-2" />
                Filter
              </button>
              
              {/* Mobile filter drawer */}
              <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-lg transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Filter Projects</h3>
                      <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <X size={22} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col space-y-2">
                      {filters.map(filter => (
                        <button
                          key={filter.id}
                          onClick={() => handleFilterChange(filter.id)}
                          className={`px-4 py-3 rounded-md text-base font-medium transition-all text-left ${
                            activeFilter === filter.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center mb-4 md:mb-0">
                <Filter size={20} className="mr-2 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Filter Projects</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-md text-base font-medium transition-all ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-pressed={activeFilter === filter.id}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Projects - Carousel on mobile/tablet, grid on desktop */}
      {featuredProjects.length > 0 && (
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center mb-6 md:mb-8">
              <Star size={isMobile ? 20 : 22} className="mr-2 md:mr-3 text-blue-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Projects
              </h2>
            </div>
            
            {(isMobile || isTablet) ? (
              <div className="relative" ref={featuredCarouselRef}>
                <div className="overflow-hidden rounded-lg">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {featuredProjects.map((project, index) => (
                      <div key={project.id} className="w-full flex-shrink-0">
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 bg-blue-600 text-white">
                              {filters.find(filter => filter.id === project.category)?.name}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                            <p className="text-base md:text-lg text-gray-200 mb-3 line-clamp-2 opacity-90">
                              {project.description}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-base text-gray-300">{project.client}</span>
                              <button 
                                onClick={() => isMobile ? openProjectModal(project) : window.location.href = `/projects/${project.id}`}
                                className="flex items-center text-base md:text-lg text-white font-medium"
                              >
                                <span>View Project</span>
                                <ArrowRight size={18} className="ml-2" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Carousel controls */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2 items-center">
                    {featuredProjects.map((_, index) => (
                      <button 
                        key={index} 
                        className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={prevSlide}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 md:gap-8">
                {featuredProjects.map(project => (
                  <div 
                    key={project.id}
                    className="group relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3 bg-blue-600 text-white">
                        {filters.find(filter => filter.id === project.category)?.name}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                      <p className="text-base text-gray-200 mb-4 opacity-90">
                        {project.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-300">{project.client}</span>
                        <a href={`/projects/${project.id}`} className="flex items-center text-base text-white font-medium group">
                          <span>View Project</span>
                          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Main Portfolio Grid - Adaptive layout for different screen sizes */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-6 lg:gap-8`}>
            {filteredProjects.slice(0, visibleItems).map((project, index) => (
              <div 
                key={project.id}
                className={`transition-all duration-500 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div 
                  className={`h-full rounded-lg overflow-hidden bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${isMobile ? 'active:scale-98' : ''}`}
                  onClick={() => isMobile ? openProjectModal(project) : null}
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-600 text-white">
                          <Star size={14} className="mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{project.title}</h3>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{project.year}</span>
                    </div>
                    
                    <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                      {project.tags.slice(0, isMobile ? 2 : 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-block px-2 py-1 text-sm rounded bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > (isMobile ? 2 : 3) && (
                        <span className="inline-block px-2 py-1 text-sm rounded bg-gray-100 text-gray-700">
                          +{project.tags.length - (isMobile ? 2 : 3)}
                        </span>
                      )}
                    </div>
                    
                    <div className="pt-3 md:pt-4 mt-1 md:mt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Client: <span className="font-medium text-gray-900">{project.client}</span></span>
                      {!isMobile && (
                        <a 
                          href={`/projects/${project.id}`}
                          className="flex items-center text-base md:text-lg font-medium text-blue-600 hover:text-blue-700"
                        >
                          <span>Details</span>
                          <ExternalLink size={isMobile ? 16 : 18} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button - Adaptive size */}
          {visibleItems < filteredProjects.length && (
            <div className="mt-8 md:mt-12 text-center">
              <button 
                onClick={loadMore}
                className="px-6 md:px-8 py-3 md:py-4 rounded-md bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center mx-auto text-base md:text-lg"
              >
                <span>{isMobile ? "Load More" : "Load More Projects"}</span>
                <Plus size={isMobile ? 18 : 20} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Stats Section - Swipeable cards on mobile */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900">
              Our Impact in Numbers
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Since 2008, we've been creating exceptional experiences for brands across Nigeria
            </p>
          </div>
          
          {isMobile ? (
            <div className="overflow-x-auto hide-scrollbar pb-4">
              <div className="flex space-x-4 px-2 min-w-max">
                <div className="w-40 p-4 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                  <div className="text-3xl font-bold mb-1 text-blue-600">500+</div>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
                
                <div className="w-40 p-4 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                  <div className="text-3xl font-bold mb-1 text-blue-600">15+</div>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                
                <div className="w-40 p-4 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                  <div className="text-3xl font-bold mb-1 text-blue-600">200+</div>
                  <p className="text-sm text-gray-600">Satisfied Clients</p>
                </div>
                
                <div className="w-40 p-4 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                  <div className="text-3xl font-bold mb-1 text-blue-600">12</div>
                  <p className="text-sm text-gray-600">Industry Awards</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                 <div className="p-4 md:p-6 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-blue-600">500+</div>
                <p className="text-base text-gray-600">Projects Completed</p>
              </div>
              
              <div className="p-4 md:p-6 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-blue-600">15+</div>
                <p className="text-base text-gray-600">Years Experience</p>
              </div>
              
              <div className="p-4 md:p-6 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-blue-600">200+</div>
                <p className="text-base text-gray-600">Satisfied Clients</p>
              </div>
              
              <div className="p-4 md:p-6 rounded-lg bg-white border border-gray-100 text-center shadow-sm">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-blue-600">12</div>
                <p className="text-base text-gray-600">Industry Awards</p>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action - Simplified for mobile */}
      <section className="py-8 md:py-12 lg:py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900">
              Ready to Transform Your Next Event?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8">
              Let's collaborate to create a memorable branded experience that leaves a lasting impression.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a 
                href="/contact" 
                className="px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
              >
                <span>Request a Quote</span>
                <ArrowRight size={isMobile ? 18 : 20} className="ml-2" />
              </a>
              
              <a 
                href="/projects" 
                className="px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-medium bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-all duration-300 justify-center"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Project Modal */}
      {isMobile && isProjectModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center" onClick={closeProjectModal}>
          <div 
            className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto m-4" 
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full aspect-video object-cover"
              />
              <button 
                onClick={closeProjectModal}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X size={20} />
              </button>
              {selectedProject.featured && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-600 text-white">
                    <Star size={14} className="mr-1" />
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 bg-blue-600 text-white">
                  {filters.find(filter => filter.id === selectedProject.category)?.name}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{selectedProject.year}</span>
              </div>
              
              <p className="text-base text-gray-700 mb-4">
                {selectedProject.description}
              </p>
              
              <h4 className="text-base font-medium text-gray-900 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="inline-block px-2 py-1 text-sm rounded bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Client:</h4>
                    <p className="text-base text-gray-700">{selectedProject.client}</p>
                  </div>
                  <a 
                    href={`/projects/${selectedProject.id}`}
                    className="flex items-center text-base font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-md"
                  >
                    <span>View Full Project</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        .active:scale-98 {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;