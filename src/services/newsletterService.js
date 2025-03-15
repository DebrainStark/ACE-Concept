// src/services/newsletterService.js
import config from '../config/environment';

/**
 * Subscribes a user to the newsletter
 * @param {string} email - The email address to subscribe
 * @returns {Promise<Object>} - Result of the subscription attempt
 */
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${config.apiUrl}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }
    
    return { 
      success: true, 
      message: data.message || 'Successfully subscribed to newsletter'
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to subscribe to newsletter' 
    };
  }
};

/**
 * Mock function for testing without a backend
 * @param {string} email - The email address to subscribe
 * @returns {Promise<Object>} - Simulated result
 */
export const mockSubscribeToNewsletter = (email) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        resolve({ 
          success: false, 
          message: 'Please enter a valid email address' 
        });
        return;
      }
      
      // Simulate successful response
      resolve({ 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
      });
    }, 800); // Simulate network delay
  });
};