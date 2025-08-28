const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Health check endpoint that checks MongoDB connection
router.get('/health', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) { // 1 = connected
      return res.status(200).json({ status: 'ok', mongodb: 'connected' });
    } else {
      return res.status(500).json({ status: 'error', mongodb: 'disconnected' });
    }
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
