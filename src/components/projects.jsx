import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowRight } from "react-feather";
import projectsData from "../data/projectData"; // Make sure this import is correct

const Projects = ({ projects = projectsData }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const containerRef = useRef(null);

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

  // Handle mouse move for subtle parallax effect - only on desktop
  const handleMouseMove = (e) => {
    if (windowWidth < 1024) return; // Skip on mobile/tablet
    
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  // Calculate parallax movement
  const getParallaxStyle = (depth = 1) => {
    if (windowWidth < 1024) return {}; // Disable parallax on mobile/tablet
    
    const xMovement = (mousePosition.x - 0.5) * depth * 20;
    const yMovement = (mousePosition.y - 0.5) * depth * 20;
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden"
    >
      {/* Subtle background pattern - laser-cut inspired */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97l-1.414 1.415L0 36.485v-2.83zm0 5.657L8.485 47.8l-1.414 1.414L0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.414 1.415L60 36.485v-2.83zm0 5.657L51.515 47.8l1.414 1.414L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.143l7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%231E429F' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-blue-200/50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={getParallaxStyle(0.1)}>
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4 border border-blue-200">
            OUR WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Featured <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="mt-3 sm:mt-4 w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest red carpet experiences, custom fabrications, and LED installations
          </p>
        </div>

        {/* Projects grid - responsive with fewer columns on mobile */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={getParallaxStyle(0.2 + index * 0.05)}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg bg-white transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              {/* Project image - responsive height */}
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <div
                  className="w-full h-48 sm:h-56 md:h-64 bg-cover bg-center transform group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content - light theme version */}
              <div className="p-4 sm:p-6 relative">
                {/* Category badge */}
                <div className="inline-flex px-2 py-1 sm:px-3 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-2 sm:mb-3 border border-blue-100">
                  {project.category}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 line-clamp-2">
                  {project.description || "Custom fabrication and innovative design solutions for a memorable event experience."}
                </p>
                
                <div className="mt-3 sm:mt-4 flex justify-between items-center">
                  <button className="flex items-center text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors group-hover:font-medium">
                    View Project 
                    <ChevronRight className="ml-1 group-hover:ml-2 transition-all" size={windowWidth < 640 ? 14 : 16} />
                  </button>
                  
                  {/* Arrow icon that appears on hover */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight size={windowWidth < 640 ? 14 : 16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all projects button */}
        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
            Explore All Projects
            <ChevronRight size={windowWidth < 640 ? 14 : 16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;