const express = require("express");
const router = express.Router();
<<<<<<< Updated upstream
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

=======

const {
  getTeacherDashboard,
  createCourse,
  getTeacherCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getTeacherStudents,
  getTeacherAnalytics,
  getTeacherProfile,
  updateTeacherProfile,
  getQuizPerformanceReport
} = require("../controllers/teacherController");

const { protect } = require("../middleware/authMiddleware");

// Dashboard
router.get("/dashboard", protect, getTeacherDashboard);

// Courses
router
  .route("/courses")
  .post(protect, createCourse)
  .get(protect, getTeacherCourses);

router
  .route("/courses/:id")
  .get(protect, getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

// Students
router.get("/students", protect, getTeacherStudents);

// Analytics
router.get("/analytics", protect, getTeacherAnalytics);

// Teacher Profile
router
  .route("/profile")
  .get(protect, getTeacherProfile)
  .put(protect, updateTeacherProfile);

// Quiz Report
router.get(
  "/quiz-reports/:quizId",
  protect,
  getQuizPerformanceReport
);

>>>>>>> Stashed changes
module.exports = router;