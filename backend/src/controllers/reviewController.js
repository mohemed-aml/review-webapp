// backend/src/controllers/reviewController.js
const Review = require('../models/Review');
const Book = require('../models/Book');
const User = require('../models/User');
const mongoose = require('mongoose');

// GET /reviews (Query by book id)
const getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    // Fetch the book document and populate the reviews field
    // const bookWithReviews = await Book.findById(bookId).populate({
    //   path: 'reviews',
    //   populate: {
    //     path: 'user',
    //     select: 'firebaseUID name', // Only include firebaseUID and name from the user model
    //   },
    // });

    // Check if the book exists
    // if (!bookWithReviews) {
    //   return res.status(404).json({ message: 'Book not found' });
    // }

    const bookExists = await Book.findById(bookId).populate('reviews');
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const reviews = bookExists.reviews;
    res.json(reviews);

    // Return the populated reviews
    // res.json(bookWithReviews.reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /reviews (Add a new review)
const addReview = async (req, res) => {
  try {
    const { book, user: firebaseUID, rating, comment } = req.body;

    // Validate ObjectId for the book only, user is identified by Firebase UID
    if (!mongoose.isValidObjectId(book)) {
      return res.status(400).json({ message: `Invalid book ID, ${book}` });
    }

    // Convert string IDs to MongoDB ObjectId after validation
    const bookId = new mongoose.Types.ObjectId(book); 

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    // Check if the book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the user by firebaseUID
    const userExists = await User.findOne({ firebaseUID });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: firebaseUID });
    if (existingReview) {
      return res.status(400).json({ message: 'User has already reviewed this book' });
    }

    const newReview = new Review({
      book: bookId,
      user: firebaseUID,
      rating,
      comment,
    });

    await newReview.save();

    // Add the review ID to the book's reviews array
    bookExists.reviews.push(newReview._id);
    await bookExists.save();

    // Add the review ID to the user's reviews array
    userExists.reviews.push(newReview._id);
    await userExists.save();

    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error adding review:', err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getReviews, addReview };