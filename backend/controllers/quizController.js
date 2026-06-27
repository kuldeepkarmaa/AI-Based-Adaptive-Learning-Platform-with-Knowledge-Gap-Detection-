const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

// @desc    Create a new quiz/test for a course
// @route   POST /api/quiz/create
// @access  Private (Teacher or Admin)
const createQuiz = async (req, res) => {
  try {
    const { title, topic, courseId, questions } = req.body;

    // Security check: only Teacher or Admin
    if (req.user.role.toLowerCase() !== 'teacher' && req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to create quizzes' });
    }

    // Verify if Course exist or not 
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ success: false, message: 'Associated course not found' });
    }

    const quiz = await Quiz.create({
      title,
      topic,
      courseId,
      creator: req.user._id,
      questions
    });

    res.status(201).json({
      success: true,
      message: 'Quiz generated and saved successfully',
      data: quiz
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating quiz', error: error.message });
  }
};

// @desc    Get all quizzes for a specific course
// @route   GET /api/quiz/course/:courseId
// @access  Private (All Users - Student/Teacher/Admin)
const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId }).select('-questions.answerOptions.isCorrect'); 
    // Secure Practice: Student ko fetch karte waqt direct correct answers nahi dikhne chahiye!

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching quizzes', error: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCourse
};