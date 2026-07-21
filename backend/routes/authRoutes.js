const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// Protected Endpoint
router.get('/me', protect, getMe);

module.exports = router;