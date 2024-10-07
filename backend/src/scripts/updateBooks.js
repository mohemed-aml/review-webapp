  // backend/src/scripts/updateBooks.js
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  const path = require('path');
  const Book = require('../models/Book');

  // Load environment variables from the root .env file
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });

  async function updateBooks() {
    try {
      mongoose.connect(process.env.MONGO_URI)
        .then(() => {
          console.log('Connected to MongoDB Atlas');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error.message);
          process.exit(1);  // Exit the app on connection failure
        });

      // Update all existing books to include the new fields
      const result = await Book.updateMany({}, { $set: { genres: [], publishedDate: null, isbn10: '', isbn13: '', favorites: 0, reviews: [] } });

      console.log(`Modified ${result.nModified} book documents to include favorites and reviews fields`);
      mongoose.disconnect();
    } catch (error) {
      console.error('Error updating books:', error);
    }
  }

  updateBooks();