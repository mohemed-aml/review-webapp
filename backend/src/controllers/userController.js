// backend/src/controllers/userController.js
const User = require('../models/User');

// GET /users/:id (Retrieve user profile by ID)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Assuming you hash the password elsewhere

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };