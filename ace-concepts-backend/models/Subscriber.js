// server/models/Subscriber.js
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: {
    type: String
  }
});

// Create a text index on the email field for faster searching
subscriberSchema.index({ email: 'text' });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;