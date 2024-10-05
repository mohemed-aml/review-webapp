// backend/src/controllers/reviewController.js
const Review = require('../models/Review');
const Book = require('../models/Book');

// GET /reviews (Query by book id)
const getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const reviews = await Review.find({ book: bookId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /reviews
const addReview = async (req, res) => {
  try {
    const { book, user, rating, comment } = req.body;

    if (!book || !user || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newReview = new Review({
      book,
      user,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews, addReview };