const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get Overall Platform Analytics/Metrics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getPlatformStats = async (req, res) => {
  try {
  
    if (req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Management rights required.' });
    }

    // Parallel processing database counts for ultimate optimization
    const [totalStudents, totalTeachers, totalCourses] = await Promise.all([
      User.countDocuments({ role: { $regex: /^student$/i } }),
      User.countDocuments({ role: { $regex: /^teacher$/i } }),
      Course.countDocuments({})
    ]);

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          students: totalStudents,
          teachers: totalTeachers,
          courses: totalCourses
        },
        systemStatus: "Operational",
        databaseHost: "MongoDB Atlas Cloud"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Side Aggregation Error', error: error.message });
  }
};

module.exports = { getPlatformStats };