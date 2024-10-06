// backend/src/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

// GET /reviews (Retrieve reviews for a book based on query parameters)
router.get('/', getReviews);

// POST /reviews (Submit a new review, requires authentication)
router.post('/', protect, addReview);

module.exports = router;