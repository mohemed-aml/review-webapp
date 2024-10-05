// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, createUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// POST /users/create (Create a user in MongoDB after Firebase auth)
router.post('/create', protect, createUser);

// GET /users/:id (Retrieve user profile by Firebase UID)
router.get('/:id', protect, getUserProfile);

// PUT /users/:id (Update user profile)
router.put('/:id', protect, updateUserProfile);

module.exports = router;