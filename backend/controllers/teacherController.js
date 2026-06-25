const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/teacher/courses
// @access  Private (Teacher only)
const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, modules } = req.body;

    // Security check: Sirf teacher role wale hi create kar payein
   if (req.user.role.toLowerCase() !== 'teacher' && req.user.role.toLowerCase() !== 'admin') {
  return res.status(403).json({ success: false, message: 'Not authorized as a teacher' });
}

    const course = await Course.create({
      title,
      description,
      category,
      level,
      modules,
      teacher: req.user._id // Request user context se logged-in teacher ki id map hogi
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in creating course', error: error.message });
  }
};

// @desc    Get all courses created by specific teacher
// @route   GET /api/teacher/courses
// @access  Private (Teacher only)
const getTeacherCourses = async (req, res) => {
  try {
   if (req.user.role.toLowerCase() !== 'teacher' && req.user.role.toLowerCase() !== 'admin') {
  return res.status(403).json({ success: false, message: 'Not authorized as a teacher' });
}

    // Database query filtering via teacher context
    const courses = await Course.find({ teacher: req.user._id });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in fetching courses', error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/teacher/courses/:id
// @access  Private (Only the owner Teacher or Admin)
const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Security Check: Kya ye vahi teacher hai jisne course banaya tha?
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role.toLowerCase() !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this course' });
    }

    // Database content update execution
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Course updated successfully', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in updating course', error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/teacher/courses/:id
// @access  Private (Only the owner Teacher or Admin)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Security Check: Same creator verification
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role.toLowerCase() !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this course' });
    }

    // Database document completely removal pipeline
    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Course removed successfully from cloud storage' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error in deleting course', error: error.message });
  }
};


module.exports = {
  createCourse,
  getTeacherCourses,
  updateCourse, // <--- Add this
  deleteCourse  // <--- Add this
};