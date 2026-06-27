const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateAIQuiz } = require('../controllers/quizController');

// Standard endpoint for baseline core generation pipeline
router.post('/generate', protect, generateAIQuiz);

module.exports = router;