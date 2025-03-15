import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users } from 'lucide-react';
import team from "/About.jpg";

const OurTeam = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Managing Director data
  const managingDirector = {
    id: 1,
    name: "OLATUNDE DARAMOLA",
    title: "Managing Director",
    specialty: "Company Leadership",
    icon: <Briefcase size={18} className="text-blue-400" />,
    image: team,
    description: "Oversees all aspects of the company, including branding, fabrication, sales, and marketing. Sets the company's overall vision and strategy and makes key decisions about the company's direction and growth."
  };

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

  // Parallax effect for mouse movement
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

  // Calculate parallax movement
  const getParallaxStyle = (depth = 1) => {
    if (windowWidth < 1024) return {}; // Disable parallax on mobile/tablet
    
    const xMovement = (mousePosition.x - 0.5) * depth * 20;
    const yMovement = (mousePosition.y - 0.5) * depth * 20;
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
  };

  // Check device type
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -top-64 -left-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -bottom-64 -right-64 bg-blue-700 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Company Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Meet Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Managing Director</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300">
            The visionary leadership behind Ace Concepts who guides our team to deliver extraordinary branded experiences since 2008.
          </p>
        </motion.div>

        {/* Managing Director showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Director display - image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 lg:col-span-5"
            style={getParallaxStyle(0.2)}
          >
            <div className="relative rounded-xl overflow-hidden mx-auto max-w-sm md:max-w-none">
              {/* Image with overlay */}
              <div className="relative aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                <img 
                  src={managingDirector.image} 
                  alt={managingDirector.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-blue-600/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
          
          {/* Director information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-7"
            style={getParallaxStyle(0.3)}
          >
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 rounded-lg p-4 sm:p-6 md:p-8 border border-blue-700/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-full bg-white/10">
                  {managingDirector.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">
                  {managingDirector.specialty}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {managingDirector.name}
              </h3>
              
              <p className="text-blue-400 text-base sm:text-lg font-medium mb-4 sm:mb-6">
                {managingDirector.title}
              </p>
              
              <div className="mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-gray-300">
                  {managingDirector.description}
                </p>
              </div>
              
              {/* Company structure info */}
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center">
                  <Users size={isMobile ? 16 : 20} className="mr-2 text-blue-400" />
                  Department Structure
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>Production Team & Head Fabrications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>Creative Directors & Brand Designers</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>Fabrication Management & Event Supervision</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>Client Service & Project Management</span>
                  </li>
                </ul>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-1">Since</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">2008</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-1">200+</div>
                  <div className="text-xs sm:text-sm text-gray-400">Satisfied Clients</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;