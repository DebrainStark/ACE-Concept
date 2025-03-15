// App.jsx - Simplified without loading logic
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import PortfolioPage from "./pages/Portfolio";
import RedCarpetPage from "./pages/Services/RedCarprt";
import FabricationPage from "./pages/Services/Fabrication";
import LedInstallationsPage from "./pages/Services/Led";
import SignagePage from "./pages/Services/Sign";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            {/* Main pages */}
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />

            {/* Service-specific pages */}
            <Route path="/services/red-carpet" element={<RedCarpetPage />} />
            <Route path="/services/fabrication" element={<FabricationPage />} />
            <Route path="/services/led" element={<LedInstallationsPage />} />
            <Route path="/services/signage" element={<SignagePage />} />

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