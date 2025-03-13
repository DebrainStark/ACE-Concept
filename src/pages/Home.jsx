import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import projectsData from "../data/projectData";
import Projects from "../components/projects";
import AboutUs from "../components/About";
import OurTeam from "../components/OurTeam";
import ClientSection from "../components/Clients";
import Partners from "../components/Partners";

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
      <Navigation />
      <div className="min-h-screen bg-black">
        <Hero />
        <AboutUs />
        <OurTeam />
        <Projects projects={projectsData} />
        <ClientSection />
        <Partners />
      </div>
    </div>
  );
};

export default HomePage;
