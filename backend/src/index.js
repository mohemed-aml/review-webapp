// backend/src/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);  // Exit the app on connection failure
});

// Import Routes
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

// API Routes
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));