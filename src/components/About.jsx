import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Aboutusplaceholder from "../assets/event setup.jpg";
import { Camera, Scissors, Monitor, Award, Users, Calendar, Check, Star, Target } from "react-feather";

const AboutUs = ({ aboutUs }) => {
  const [activeTab, setActiveTab] = useState('vision');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Updated tabs with correct company information
  const tabs = [
    { 
      id: 'vision', 
      label: 'Our Vision',
      icon: <Star className="w-5 h-5" />,
      content: aboutUs?.vision || "To provide quality services that exceeds the expectations of our esteemed customers." 
    },
    { 
      id: 'mission', 
      label: 'Our Mission',
      icon: <Target className="w-5 h-5" />, 
      content: aboutUs?.mission || "To enhance our clients brands, build long term relationships with our customers and clients and provide exceptional Product services by pursuing business through innovation and quality service delivery." 
    },
    { 
      id: 'values', 
      label: 'Core Values',
      icon: <Check className="w-5 h-5" />,
      content: aboutUs?.values || "We believe in treating our customers with respect and faith. We grow through creativity, invention and innovation. We integrate honesty, integrity and business ethics into all aspects of our business functioning." 
    }
  ];

  // Company stats based on document information
  const stats = [
    { value: 'Since', label: '2008', icon: <Calendar /> },
    { value: '15+', label: 'Years of Excellence', icon: <Award /> },
    { value: '200+', label: 'Satisfied Clients', icon: <Users /> }
  ];

  // Updated services to match actual company offerings
  const services = [
    {
      title: 'Red Carpet Media Experiences',
      icon: <Camera className="text-red-400" size={24} />,
      description: 'Brand-centric media walls and red carpet setups that create perfect photo opportunities for VIP events.',
      color: 'from-red-500/10 to-red-500/5',
      border: 'border-red-500/20'
    },
    {
      title: 'Custom Fabrication',
      icon: <Scissors className="text-purple-400" size={24} />,
      description: 'Crafting and building custom furniture, fixtures, props and signage for all environments.',
      color: 'from-purple-500/10 to-purple-500/5',
      border: 'border-purple-500/20'
    },
    {
      title: 'LED & Laser-Cut Solutions',
      icon: <Monitor className="text-blue-400" size={24} />,
      description: 'Specialized design of custom built LED and laser-cutting services for all fabrications and branding.',
      color: 'from-blue-500/10 to-blue-500/5',
      border: 'border-blue-500/20'
    }
  ];

  // Company goals from the document
  const goals = [
    "Regional expansion in the field of branding and develop a strong base of satisfied customers.",
    "Increase the assets and investments of the company to support the development of services.",
    "To build good reputation in branding and fabrication and become a key player in the print industry."
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-white text-gray-800 overflow-hidden"
    >
      {/* Subtle background pattern - inspired by laser-cut designs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97l-1.414 1.415L0 36.485v-2.83zm0 5.657L8.485 47.8l-1.414 1.414L0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.414 1.415L60 36.485v-2.83zm0 5.657L51.515 47.8l1.414 1.414L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 12.143l7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23a0aec0' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-2"
          >
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-50 to-blue-50 text-sm font-medium text-gray-700 border border-gray-200">
              SINCE 2008
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Ace Concepts</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 mx-auto rounded-full mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-gray-600"
          >
            Since its founding in 2008, Ace Concepts Ventures has become a leading innovator and supplier of 
            high-quality tailor-made branding and fabricated illuminated signage and media wall in Nigeria.
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left side: Services */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Scope of Work</h3>
            
            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className={`p-6 rounded-xl bg-gradient-to-r ${service.color} ${service.border} border transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-lg bg-white/80 shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-12 bg-gray-50 rounded-xl p-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-blue-100 mb-2 mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Company contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl"
            >
              <h4 className="text-gray-500 text-sm font-medium mb-2">Main Company Contact</h4>
              <p className="text-xl font-bold text-gray-800">OLATUNDE DARAMOLA</p>
            </motion.div>
          </motion.div>
          
          {/* Right side: About content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="relative mb-12">
              {/* Image with overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 group-hover:opacity-50 transition-opacity duration-500" />
                
                <img
                  src={aboutUs?.image || Aboutusplaceholder}
                  alt="Our Passion"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
                
                {/* Laser-cut pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Business Profile information */}
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">Business Profile</h3>
                  <p className="text-gray-200">A leading innovator and supplier of high quality tailor made branding and fabricated illuminated signage in Nigeria.</p>
                </div>
              </div>
              
              {/* Floating purpose card */}
              <div className="absolute -bottom-6 -right-6 md:right-8 bg-white p-5 rounded-xl shadow-lg max-w-xs">
                <div className="text-sm font-medium text-gray-500 mb-1">Company Purpose</div>
                <div className="text-sm text-gray-700">
                  To be a voice within the Branding and Fabrication Industry by providing quality, bespoke and enhanced services.
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-6">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-50 to-blue-50 text-gray-800 border-red-500 shadow-sm'
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={`mr-2 ${activeTab === tab.id ? 'text-red-500' : 'text-gray-400'}`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </motion.button>
                ))}
              </div>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="prose prose-lg max-w-none text-gray-600"
              >
                <p>{tabs.find(tab => tab.id === activeTab)?.content}</p>
              </motion.div>
              
              {/* Goals Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Our Goals</h4>
                <div className="space-y-3">
                  {goals.map((goal, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="flex items-start"
                    >
                      <div className="mt-1 mr-3 text-blue-500">
                        <Check size={16} />
                      </div>
                      <p className="text-gray-600">{goal}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gray-200"
              >
                <a href="/portfolio" className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                  Our Portfolio
                </a>
                
                <a href="/contact" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;