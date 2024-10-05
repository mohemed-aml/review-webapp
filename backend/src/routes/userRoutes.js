// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// GET /users/:id (Retrieve a user profile by ID)
router.get('/:id', getUserProfile);

// PUT /users/:id (Update a user profile)
router.put('/:id', updateUserProfile);

module.exports = router;