// backend/src/controllers/userController.js
const User = require('../models/User');

// Utility function to generate a random username
const generateRandomUsername = () => {
  const randomString = Math.random().toString(36).substring(2, 10); // Generate random alphanumeric string
  return `user_${randomString}`; // You can prefix it for clarity
};

// Function to check username uniqueness in MongoDB
const isUsernameUnique = async (username) => {
  const user = await User.findOne({ username });
  return !user; // Returns true if username is unique
};

// POST /users/create (Create user profile in MongoDB after Firebase authentication)
const createUser = async (req, res) => {
  const { name, email } = req.body; // Get user data from request body
  const firebaseUID = req.user.uid; // Firebase UID from protect middleware

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ firebaseUID });

    // If user doesn't exist, create a new user
    if (!user) {
      const existingUserByEmail = await User.findOne({ email });

      if (existingUserByEmail) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      let username;
      do {
        username = generateRandomUsername(); // Generate a random username
      } while (!(await isUsernameUnique(username))); // Ensure the username is unique

      // Create a new user if it doesn't exist
      user = new User({
        firebaseUID,
        name,
        email,
        username,
      });
      await user.save();
    }
    else {
      return res.status(400).json({ message: 'User with firebase UUID already exists' });
    }

    res.status(201).json(user);  // Return the user data
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(400).json({
        message: 'Duplicate field value entered',
        field: Object.keys(error.keyValue)[0],
      });
    }
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// GET /users/:id (Retrieve user profile by Firebase UID)
const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ firebaseUID: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by Firebase UID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /users/:id (Update user profile)
const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;

  try {
    // Check if username is unique (excluding the current user)
    const existingUser = await User.findOne({ username, firebaseUID: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please choose another one.' });
    }

    const user = await User.findOne({ firebaseUID: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile, createUser };