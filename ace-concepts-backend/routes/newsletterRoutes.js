// server/routes/newsletterRoutes.js
const express = require('express');
const Subscriber = require('../models/Subscriber');
const router = express.Router();

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe to the newsletter
 * @access  Public
 */
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      // If subscriber exists but inactive, reactivate them
      if (!existingSubscriber.active) {
        existingSubscriber.active = true;
        await existingSubscriber.save();
        
        return res.status(200).json({ 
          success: true, 
          message: 'Your subscription has been reactivated!' 
        });
      }
      
      return res.status(400).json({ 
        success: false, 
        message: 'This email is already subscribed to our newsletter' 
      });
    }

    // Create new subscriber
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const newSubscriber = new Subscriber({
      email,
      ipAddress
    });

    await newSubscriber.save();

    // Return success
    return res.status(201).json({ 
      success: true, 
      message: 'You have successfully subscribed to our newsletter!' 
    });
  } catch (error) {
    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }
    
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

/**
 * @route   POST /api/newsletter/unsubscribe
 * @desc    Unsubscribe from the newsletter
 * @access  Public
 */
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Find the subscriber
    const subscriber = await Subscriber.findOne({ email });
    
    if (!subscriber) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in our subscriber list' 
      });
    }

    // Set subscriber to inactive instead of deleting
    subscriber.active = false;
    await subscriber.save();

    return res.status(200).json({ 
      success: true, 
      message: 'You have been successfully unsubscribed from our newsletter' 
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

/**
 * @route   GET /api/newsletter/verify-subscription
 * @desc    Verify if an email is subscribed
 * @access  Public
 */
router.get('/verify-subscription', async (req, res) => {
  try {
    const { email } = req.query;

    // Basic validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if subscribed
    const subscriber = await Subscriber.findOne({ email, active: true });
    
    return res.status(200).json({ 
      success: true, 
      subscribed: !!subscriber 
    });
  } catch (error) {
    console.error('Subscription verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

module.exports = router;