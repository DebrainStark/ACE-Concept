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
} from "react-feather";
import logo from "../assets/ACEicon.png"; // Import your logo image

const Footer = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    setEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Ace Concept Logo" className="h-10 w-10" />
              <h3 className="text-2xl font-bold text-white">ACE CONCEPT</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Crafting extraordinary experiences that captivate and inspire.
              Transform your vision into unforgettable realities with our
              innovative event production and stage fabrication.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["About", "Services", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-6">
              Get in Touch
            </h4>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="bg-gray-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-gray-400">
                Stay updated with our latest projects and innovations
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="mailto:info@stagecraft.com"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              info@aceconcept.com
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              +1 (234) 567-890
            </a>
            <div className="flex items-center text-gray-400">
              <MapPin className="h-5 w-5 mr-2" />
              123 Creative Avenue, Design District
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ace Concept. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
