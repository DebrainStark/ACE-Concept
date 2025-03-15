// src/components/EnhancedLoading.jsx
import React, { useEffect, useState } from 'react';

const EnhancedLoading = () => {
  const [loadingText, setLoadingText] = useState('');
  const [showFullText, setShowFullText] = useState(false);
  const fullText = "ACE Concept";
  
  useEffect(() => {
    // First animate the text letter by letter
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setLoadingText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(textInterval);
        setShowFullText(true);
      }
    }, 150);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="relative mb-6">
          {/* Concentric spinning circles */}
          <div className="w-20 h-20 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="w-14 h-14 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="w-8 h-8 border-t-4 border-b-4 border-blue-300 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
               style={{ animationDuration: '1s' }}></div>
        </div>
        
        {/* Animated text display */}
        <div className="h-12">
          {showFullText ? (
            <h2 className="text-3xl font-bold text-blue-600 animate-pulse">ACE Concept</h2>
          ) : (
            <h2 className="text-3xl font-bold text-blue-600">{loadingText}<span className="animate-pulse">|</span></h2>
          )}
        </div>
        
        <p className="text-gray-600 mt-2 animate-pulse">Loading amazing experiences...</p>
      </div>
    </div>
  );
};

export default EnhancedLoading;