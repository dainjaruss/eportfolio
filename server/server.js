const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 1. define routes
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');
const uploadRouter = require('./routes/upload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// 2. initialize app and port
const app = express();

const PORT = process.env.PORT || 5000;

// 3. connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  // Start initial connection
  connectDB();
}

// Middleware to ensure DB is connected before processing requests
app.use(async (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      await connectDB();
      next();
    } catch (err) {
      res.status(500).json({ error: 'Database connection failed' });
    }
  } else {
    next();
  }
});


// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  exposedHeaders: ['WWW-Authenticate'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// request logger for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// serve stuff from /public (like profile pics)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'ePortfolio API is up and running' });
});

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/upload', uploadRouter);

// 404 handler for anything else
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Final error handler for everything else (500s, etc.)
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

