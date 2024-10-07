// backend/src/scripts/updateUserReviews.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function updateUserReviews() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Update all users to transform reviews field into an array of reviewIds only
    const users = await User.find();
    for (let user of users) {
      if (Array.isArray(user.reviews)) { // Check if reviews field exists and is an array
        user.reviews = user.reviews.map(review => review.reviewId); // Keep only the reviewId
      } else {
        console.warn(`User with ID ${user._id} has no reviews or reviews is not in expected format`);
        user.reviews = []; // Initialize as an empty array if not present or in incorrect format
      }
      await user.save();
    }

    console.log('Successfully updated user reviews to only include reviewIds');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating user reviews:', error);
  }
}

updateUserReviews();