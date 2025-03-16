import React, { useState, useEffect } from "react";
import { ChevronDown, Phone } from "react-feather";
import AceLogo from "../assets/ACE-LOGO4.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Services dropdown items
  const serviceItems = [
    { name: "Red Carpet Events", href: "/services/red-carpet" },
    { name: "Custom Fabrication", href: "/services/fabrication" },
    { name: "LED Installations", href: "/services/led" },
    { name: "Laser-Cut Signage", href: "/services/signage" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close mobile menu and dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
      
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, activeDropdown]);

  return (
    <nav
      className={`navv fixed w-full transition-all duration-300 ${
        scrolled ? "shadow-xl bg-white" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={AceLogo}
              alt="Ace Concept Logo"
              className="h-14 object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a 
              href="/" 
              className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a 
              href="/about" 
              className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a 
              href="/portfolio" 
              className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            {/* Services Dropdown */}
            <div className="relative group dropdown-container">
              <button
                onClick={() => handleDropdownToggle('services')}
                className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative font-medium flex items-center"
              >
                Services
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Improved dropdown menu with better animation */}
              <div 
                className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform origin-top-left ${
                  activeDropdown === 'services' 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-1">
                  {serviceItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Improved CTA Button with better hover effect */}
            <a 
              href="/contact" 
              className="ml-3 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md font-medium text-sm"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button - keeping original design but improved animation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button relative w-14 h-14 flex flex-col justify-center items-center group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative flex flex-col space-y-2 w-10">
                {/* Three fries lines with improved transitions */}
                <span 
                  className={`block h-1 bg-gray-700 transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? 'w-10 translate-y-3 rotate-45' : 'w-10'
                  }`}
                ></span>
                <span 
                  className={`block h-1 bg-gray-700 transition-all duration-300 ease-out ${
                    isMenuOpen ? 'w-10 opacity-0' : 'w-7 ml-3'
                  }`}
                ></span>
                <span 
                  className={`block h-1 bg-gray-700 transition-all duration-300 ease-out origin-center ${
                    isMenuOpen ? 'w-10 -translate-y-3 -rotate-45' : 'w-8 ml-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Improved Mobile Navigation with smoother transitions */}
      <div 
        className={`mobile-menu-container md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 shadow-xl border-t border-gray-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white px-4 pt-2 pb-6 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
        
          <a
            href="/about"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-1"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          
          <a
            href="/portfolio"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-1"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </a>
        
          {/* Improved Mobile Services Dropdown */}
          <div className="dropdown-container">
            <button
              onClick={() => handleDropdownToggle('mobile-services')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <span>Services</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${
                  activeDropdown === 'mobile-services' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div 
              className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${
                activeDropdown === 'mobile-services' 
                  ? 'max-h-64 opacity-100 py-2' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              {serviceItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Improved Mobile Contact Info */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <a 
              href="tel:+2348023945491" 
              className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Phone size={16} className="mr-2" />
              +234 802 394 5491
            </a>
          </div>
          
          {/* Improved Contact Button */}
          <div className="pt-2">
            <a
              href="/contact"
              className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .navv {
          z-index: 1000;
        }
        
        /* Add smooth scroll behavior to the page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;