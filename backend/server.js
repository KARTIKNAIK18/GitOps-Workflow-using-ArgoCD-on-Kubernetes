require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Function to connect to MongoDB with retry
const connectWithRetry = () => {
  console.log('Attempting MongoDB connection...');
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected successfully');
      // Start Express server only after DB connection
      app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
      console.error('MongoDB connection failed. Retrying in 5 seconds...', err);
      setTimeout(connectWithRetry, 5000); // Retry every 5 seconds
    });
};

// Start the connection process
connectWithRetry();

// Optional: Health endpoint for readiness/liveness probes
app.get('/api', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('OK');
  } else {
    res.status(503).send('MongoDB not ready');
  }
});
