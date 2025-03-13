import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
//import ServicesPage from "./pages/Services";
import PortfolioPage from "./pages/Portfolio";
///import TestimonialsPage from "./pages/Testimonials";
//import ContactPage from "./pages/Contact";

// Service-specific pages
//import RedCarpetPage from "./pages/services/RedCarpet";
//import FabricationPage from "./pages/services/Fabrication";
///import LedInstallationsPage from "./pages/services/LedInstallations";
//import SignagePage from "./pages/services/Signage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
           
            
            {/* 404 page - this should always be last */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-blue-600">404</h1>
                  <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
                  <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
                  <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Go Back Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;