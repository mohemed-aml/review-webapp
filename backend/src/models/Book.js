// backend/src/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publisher: String,
  coverImageUrl: { type: String },  // URL for book cover image
  rating: { type: Number, default: 0 },
  genres: [{ type: String }], // Array of genres (multiple genres allowed)
  publishedDate: { type: Date },  // Publication date of the book
  isbn10: { type: String, unique: true },  // ISBN-10 code
  isbn13: { type: String, unique: true },  // ISBN-13 code
});

module.exports = mongoose.model('Book', bookSchema);