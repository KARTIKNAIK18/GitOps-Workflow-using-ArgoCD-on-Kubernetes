require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const healthRoutes = require('./routes/health');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection status: Connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection status: Disconnected');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Drop users collection to remove old indexes and data
    try {
      await mongoose.connection.db.dropCollection('users');
      console.log('Dropped users collection to remove old indexes and data');
    } catch (err) {
      if (err.codeName !== 'NamespaceNotFound') {
        console.error('Error dropping users collection:', err.message);
      }
    }
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
