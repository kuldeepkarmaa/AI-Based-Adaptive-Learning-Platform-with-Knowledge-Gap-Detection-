const express = require('express');
const router = express.Router();
const { 
  getTeacherDashboard, 
  getTeacherAnalytics, 
  createCourse, 
  getTeacherCourses 
} = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');

// Mount Dashboard and Visual Chart analytics channels
router.get('/dashboard', protect, getTeacherDashboard);
router.get('/analytics', protect, getTeacherAnalytics);

// Mount course orchestration endpoints matching form submissions
router.route('/courses')
  .post(protect, createCourse)
  .get(protect, getTeacherCourses);

module.exports = router;