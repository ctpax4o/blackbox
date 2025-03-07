// src/controllers/usersController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
  const { username, email, password, nationality, city, occupation } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password_hash,
      nationality,
      city,
      occupation,
    });

    res.status(201).json({ message: 'User registered successfully', user_id: newUser.user_id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token to the client
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this to usersController.js
const updateProfile = async (req, res) => {
    const { nationality, city, occupation } = req.body;
    const userId = req.user.user_id; // From authenticateToken middleware
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.nationality = nationality || user.nationality;
      user.city = city || user.city;
      user.occupation = occupation || user.occupation;
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { registerUser, loginUser, updateProfile };