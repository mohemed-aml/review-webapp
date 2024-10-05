// backend/src/controllers/bookController.js
const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// GET /books - Retrieve books with pagination, search, and filters
const getBooks = async (req, res) => {
  try {
    const {
      search,
      publisher,
      minRating,
      maxRating,
      startDate,
      endDate,
      genres,
      isbn,
      limit = 10,
      page = 1
    } = req.query;

    // Pagination settings
    const skip = (page - 1) * limit;

    // Create a filter object for MongoDB query
    let filters = {};

    // Search by title or author
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search
        { author: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by publisher
    if (publisher) {
      filters.publisher = { $regex: publisher, $options: "i" }; // Case-insensitive
    }

    // Filter by rating range
    if (minRating || maxRating) {
      filters.rating = {};
      if (minRating) filters.rating.$gte = parseFloat(minRating);
      if (maxRating) filters.rating.$lte = parseFloat(maxRating);
    }

    // Filter by published date range
    if (startDate || endDate) {
      filters.publishedDate = {};
      if (startDate) filters.publishedDate.$gte = new Date(startDate);
      if (endDate) filters.publishedDate.$lte = new Date(endDate);
    }

    // Filter by genres
    if (genres) {
      const genreArray = genres.split(','); // Split genres by commas (e.g., "Fiction,Adventure")
      filters.genres = { $in: genreArray };
    }

    // Filter by ISBN (either ISBN-10 or ISBN-13)
    if (isbn) {
      filters.$or = [
        { isbn10: isbn },
        { isbn13: isbn }
      ];
    }

    // Fetch books with filters and pagination
    const books = await Book.find(filters)
      .limit(limit)
      .skip(skip);

    // Get the total count of books that match the filters
    const totalBooks = await Book.countDocuments(filters);
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      books,
      totalPages,
      currentPage: page,
      totalBooks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// GET /books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /books (Admin only)
const addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, author, description, publisher, coverImageUrl } = req.body;
    const newBook = new Book({ title, author, description, publisher, coverImageUrl });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBooks, getBookById, addBook };