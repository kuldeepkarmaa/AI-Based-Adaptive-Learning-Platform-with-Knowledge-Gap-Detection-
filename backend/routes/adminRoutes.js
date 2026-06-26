const express = require('express');
const router = express.Router();
const { getPlatformStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Route secured via token interceptor
router.get('/stats', protect, getPlatformStats);

module.exports = router;