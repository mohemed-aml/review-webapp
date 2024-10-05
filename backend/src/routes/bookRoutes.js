// backend/src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getBooks, getBookById, addBook } = require('../controllers/bookController');
const { body } = require('express-validator');

// GET /books
router.get('/', getBooks);

// GET /books/:id
router.get('/:id', getBookById);

// POST /books (Admin only)
// router.post('/', addBook);
router.post( '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  addBook
);

module.exports = router;