const express = require('express');
const router = express.Router();
const { getStudentDashboard } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Secure route passing via global route context interceptor
router.get('/dashboard', protect, getStudentDashboard);

module.exports = router;