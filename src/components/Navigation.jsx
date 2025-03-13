import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "react-feather";
import AceLogo from "../assets/ACE-LOGO2.png";

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl bg-white" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Top bar with contact info - visible only on desktop */}
     

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={AceLogo}
              alt="Ace Concept Logo"
              className="h-14 object-contain"
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
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('services')}
                className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative font-medium flex items-center"
              >
                Services
                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Dropdown menu */}
              <div 
                className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  activeDropdown === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-1">
                  {serviceItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <a 
              href="/portfolio" 
              className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <a 
              href="/about" 
              className="px-3 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            
            {/* CTA Button */}
            <a 
              href="/contact" 
              className="ml-3 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium text-sm"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 shadow-xl border-t border-gray-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white px-4 pt-2 pb-6 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          
          {/* Mobile Services Dropdown */}
          <div>
            <button
              onClick={() => handleDropdownToggle('mobile-services')}
              className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
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
              className={`pl-4 transition-all duration-200 overflow-hidden ${
                activeDropdown === 'mobile-services' ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
              }`}
            >
              {serviceItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          <a
            href="/portfolio"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </a>
          
          <a
            href="/about"
            className="block px-3 py-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          
          
          {/* Mobile Contact Info */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <a 
              href="tel:+2348023945491" 
              className="flex items-center px-3 py-2 text-blue-600"
            >
              <Phone size={16} className="mr-2" />
              +234 802 394 5491
            </a>
          </div>
          
          {/* Contact Button */}
          <div className="pt-2">
            <a
              href="/contact"
              className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;