const express = require('express');
const router = express.Router();
const { createCourse, getTeacherCourses, updateCourse, deleteCourse } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');

// Base route for listing and creating
router.route('/courses')
  .post(protect, createCourse)
  .get(protect, getTeacherCourses);

//  Particular Course ID parameter handling ke liye
router.route('/courses/:id')
  .put(protect, updateCourse)   // For Update
  .delete(protect, deleteCourse); // For Delete

  router.get('/quiz-reports/:quizId', protect, getQuizPerformanceReport);

module.exports = router;