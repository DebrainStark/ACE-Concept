import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import projectsData from "../data/projectData";
import Projects from "../components/projects";
import Contacts from "../components/Contacts";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navigation */}
      <Navigation />
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <Hero />

        {/* Featured Projects Section */}
        <Projects projects={projectsData} />

        {/* Quick Contact Section */}
        <Contacts />
      </div>
    </div>
  );
};

export default HomePage;
