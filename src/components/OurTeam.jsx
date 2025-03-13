import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Camera, Scissors, Monitor, User, Users, Briefcase, Settings } from 'lucide-react';
import team from "../assets/team.jpeg";

// Updated team data based on the organization structure
const teamMembers = [
  {
    id: 1,
    name: "OLATUNDE DARAMOLA",
    title: "Managing Director",
    specialty: "Company Leadership",
    icon: <Briefcase size={18} className="text-red-400" />,
    image: team,
    description: "Oversees all aspects of the company, including branding, fabrication, sales, and marketing. Sets the company's overall vision and strategy and makes key decisions about the company's direction and growth."
  },
  {
    id: 2,
    name: "Creative Director",
    title: "Creative Department",
    specialty: "Branding & Design",
    icon: <Camera size={18} className="text-purple-400" />,
    image: team,
    description: "Oversees the company's branding and design team. Develops and executes creative campaigns for clients and works with clients to understand their needs and develop a brand identity that meets those needs."
  },
  {
    id: 3,
    name: "Fabrication Manager",
    title: "Production Department",
    specialty: "Custom Fabrication",
    icon: <Scissors size={18} className="text-blue-400" />,
    image: team,
    description: "Oversees the company's fabrication team. Manages the production of branded products and materials and ensures that all products are produced to the highest quality standards."
  },
  {
    id: 4,
    name: "Project Manager",
    title: "Operations",
    specialty: "Project Execution",
    icon: <Settings size={18} className="text-green-400" />,
    image: team,
    description: "Oversees the day-to-day execution of individual projects, coordinating between departments to ensure timely delivery and client satisfaction."
  },
  {
    id: 5,
    name: "Branding Specialist",
    title: "Design Department",
    specialty: "Brand Identity",
    icon: <Monitor size={18} className="text-yellow-400" />,
    image: team,
    description: "Managing branding projects and all client brand identity and strategy for campaigns. Creates and develops branding and design materials."
  }
];

const OurTeam = () => {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Handle automatic rotation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentMemberIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, teamMembers.length]);

  // Parallax effect for mouse movement
  useEffect(() => {
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
  }, []);

  // Calculate parallax movement
  const getParallaxStyle = (depth = 1) => {
    const xMovement = (mousePosition.x - 0.5) * depth * 20;
    const yMovement = (mousePosition.y - 0.5) * depth * 20;
    return {
      transform: `translate(${xMovement}px, ${yMovement}px)`,
    };
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Navigate to a specific team member
  const goToMember = (index) => {
    setCurrentMemberIndex(index);
    setIsPlaying(false); // Pause autoplay when manually selecting
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] -top-64 -left-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-64 -right-64 bg-blue-700 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
            Our Leadership Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            The Expertise Behind <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Ace Concepts</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Meet the talented professionals who bring creativity and excellence to every project, delivering extraordinary branded experiences since 2008.
          </p>
        </motion.div>

        {/* Team showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Team member display */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMemberIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
                style={getParallaxStyle(0.2)}
              >
                <div className="relative rounded-xl overflow-hidden">
                  {/* Image with overlay */}
                  <div className="relative aspect-[4/5]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                    <img 
                      src={teamMembers[currentMemberIndex].image} 
                      alt={teamMembers[currentMemberIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Member info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-full bg-white/10">
                        {teamMembers[currentMemberIndex].icon}
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {teamMembers[currentMemberIndex].specialty}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {teamMembers[currentMemberIndex].name}
                    </h3>
                    <p className="text-blue-400 font-medium">
                      {teamMembers[currentMemberIndex].title}
                    </p>
                    
                    <div className="mt-4 pr-12">
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {teamMembers[currentMemberIndex].description}
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <button className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center">
                        More Details
                        <ChevronRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation indicators */}
            <div className="mt-6 flex justify-center space-x-3">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMember(index)}
                  className={`w-10 h-1 rounded-full transition-all duration-300 ${
                    index === currentMemberIndex 
                      ? "bg-blue-500" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`View team member ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Team info */}
          <div style={getParallaxStyle(0.3)}>
            <div className="space-y-6">
              {/* Intro text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Expertise in Every Department
                </h3>
                <p className="text-gray-300">
                  Our organization brings together specialized skills across design, fabrication, and project management 
                  to deliver high-quality branding experiences and custom fabrications that exceed client expectations.
                </p>
              </motion.div>
              
              {/* Team selection */}
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <motion.button
                    key={member.id}
                    onClick={() => goToMember(index)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border ${
                      currentMemberIndex === index 
                        ? 'bg-blue-600/10 border-blue-500/50 shadow-inner'
                        : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 mr-3 flex items-center justify-center bg-gray-800">
                        {member.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {member.name}
                        </h4>
                        <div className="flex items-center text-xs text-blue-400">
                          <span>{member.title}</span>
                        </div>
                      </div>
                      {currentMemberIndex === index && (
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <ArrowRight size={14} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Company structure info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10"
              >
                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 rounded-lg p-6 border border-blue-700/30">
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                    <Users size={20} className="mr-2 text-blue-400" />
                    Our Department Structure
                  </h4>
                  <ul className="space-y-2 text-gray-300">
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
              </motion.div>
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4 mt-6"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-1">Since</div>
                  <div className="text-2xl font-bold text-white">2008</div>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-1">200+</div>
                  <div className="text-sm text-gray-400">Satisfied Clients</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;