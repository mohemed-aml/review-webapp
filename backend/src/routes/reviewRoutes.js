// backend/src/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/reviewController');

// GET /reviews (Retrieve reviews for a book based on query parameters)
router.get('/', getReviews);

// POST /reviews (Submit a new review)
router.post('/', addReview);

module.exports = router;