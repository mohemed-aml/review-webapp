// backend/src/utils/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Create admin user
const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = new User({
      firebaseUID: process.env.FIREBASE_ADMIN_UUID, // This should be the Firebase UID for the admin
      name: 'Admin User',
      email: process.env.FIREBASE_ADMIN_EMAIL,
      isAdmin: true,
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();