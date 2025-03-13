import React, { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ChevronRight,
  Camera,
  Monitor,
  Scissors
} from "react-feather";
import logo from "../assets/ACEicon.png"; // Import your logo image

const Footer = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    setNewsletterSubmitted(true);
    setTimeout(() => setNewsletterSubmitted(false), 3000);
    setEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px] bg-blue-700 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                <img src={logo} alt="Ace Concept Logo" className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">ACE CONCEPT</h3>
                <p className="text-xs text-blue-400">VENTURES</p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-400">
              Transforming ordinary spaces into extraordinary brand experiences through 
              innovative red carpet events, custom fabrication, and LED installations. 
              We bring your vision to life with precision and creativity.
            </p>
            
            {/* Services overview */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-red-500/10 text-red-400">
                  <Camera size={16} />
                </div>
                <span className="text-sm text-gray-300">Red Carpet Media Branding</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-500/10 text-purple-400">
                  <Scissors size={16} />
                </div>
                <span className="text-sm text-gray-300">Custom Props & Fabrication</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                  <Monitor size={16} />
                </div>
                <span className="text-sm text-gray-300">LED & Laser-Cut Solutions</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm font-medium text-white mb-3">Connect With Us</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              <span className="inline-block">
                Navigation
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600 rounded-full"></div>
              </span>
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: "Home", url: "/" },
                { name: "About Us", url: "/about" },
                { name: "Services", url: "/services" },
                { name: "Portfolio", url: "/portfolio" },
                { name: "Testimonials", url: "/testimonials" },
                { name: "Contact", url: "/contact" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="group flex items-center py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Newsletter Section */}
            <div className="mt-12">
              <h4 className="text-lg font-semibold text-white mb-6 relative">
                <span className="inline-block">
                  Newsletter
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600 rounded-full"></div>
                </span>
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Stay updated with our latest projects and innovations
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <Send size={16} />
                </button>
                {newsletterSubmitted && (
                  <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
                )}
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              <span className="inline-block">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600 rounded-full"></div>
              </span>
            </h4>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm text-gray-400 block mb-1">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-400 block mb-1">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-gray-400 block mb-1">Your Message</label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="group relative overflow-hidden bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span className="relative z-10">Send Message</span>
                <Send size={16} className="relative z-10" />
                <div className="absolute -inset-x-full inset-y-0 w-1/2 bg-white/20 skew-x-12 transform group-hover:animate-shine"></div>
              </button>
              {formSubmitted && (
                <p className="text-green-400 text-sm mt-2">Your message has been sent. We'll respond soon!</p>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-20 pt-8 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:info@aceconcept.com"
              className="flex items-center group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                <Mail className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email Us</p>
                <p className="text-white group-hover:text-blue-400 transition-colors">info@aceconcept.com</p>
              </div>
            </a>
            
            <a
              href="tel:+2348023945491"
              className="flex items-center group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                <Phone className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Call Us</p>
                <p className="text-white group-hover:text-blue-400 transition-colors">+234 802 394 5491</p>
              </div>
            </a>
            
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Visit Us</p>
                <p className="text-white">Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative bg-black/50 py-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} <span className="text-gray-400">Ace Concepts Ventures.</span> All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        
        .group-hover\:animate-shine:hover {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;