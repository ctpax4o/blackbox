// src/routes/users.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require('../controllers/usersController');
const authenticateToken = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authenticateToken, updateProfile); // Commented out to avoid errors

module.exports = router;