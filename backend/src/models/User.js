// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },  // Store Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },  // Add unique username field
  profilePicture: { type: String },  // URL for the user's profile picture
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Track the books the user added to their favorites list
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);