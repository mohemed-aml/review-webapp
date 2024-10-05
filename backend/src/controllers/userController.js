// backend/src/controllers/userController.js
const User = require('../models/User');

// POST /users/create (Create user profile in MongoDB after Firebase authentication)
const createUser = async (req, res) => {
  const { name, email } = req.body; // Get user data from request body
  const firebaseUID = req.user.uid; // Firebase UID from protect middleware

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ firebaseUID });

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({
        firebaseUID,
        name,
        email,
      });
      await user.save();
    }

    res.status(201).json(user);  // Return the user data
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// GET /users/:id (Retrieve user profile by Firebase UID)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.id });  // Find user by Firebase UID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /users/:id (Update user profile)
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, favorites } = req.body; // Password updates are handled in Firebase
    const user = await User.findOne({ firebaseUID: req.params.id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (favorites) user.favorites = favorites; // Update favorites list if provided

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile, createUser };