const express = require('express');
const router = express.Router();
const { getTeacherDashboard, createCourse, getTeacherCourses, updateCourse, deleteCourse, getCourseById, getTeacherStudents, getTeacherAnalytics, getTeacherProfile,updateTeacherProfile } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');


router.get("/dashboard",protect, getTeacherDashboard);
router.get("/courses/:id",protect,getCourseById);
router.get("/students",protect,getTeacherStudents);
router.get("/analytics",protect,getTeacherAnalytics);
router.get("/profile",protect,getTeacherProfile);
router.put("/profile",protect,updateTeacherProfile);
// Base route for listing and creating
router.route('/courses')
  .post(protect, createCourse)
  .get(protect, getTeacherCourses);

//  Particular Course ID parameter handling ke liye
router.route('/courses/:id')
  .put(protect, updateCourse)   // For Update
  .delete(protect, deleteCourse); // For Delete

<<<<<<< HEAD
  router.get('/quiz-reports/:quizId', protect, getQuizPerformanceReport);
=======
>>>>>>> de49053eea9050c353fae4e8f281acfb2cd1bc7c

module.exports = router;