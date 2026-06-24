const Course = require('../models/Course');
const User = require('../models/User');

const getStudentDashboard = async (req, res) => {
  try {
    // 1. Logged-in user context object
    const studentName = req.user.fullName;

    // 2. Fallback Mock Pipeline Data (Tab tak jab tak AI/Quiz collection complete nahi hote)
    const stats = {
      enrolledCourses: 2,
      quizzesTaken: 4,
      avgScore: 78,
      knowledgeGaps: 1,
      overallProgress: 65,
      quizHistory: [
        { name: "Quiz 1", score: 60 },
        { name: "Quiz 2", score: 75 },
        { name: "Quiz 3", score: 80 },
        { name: "Quiz 4", score: 95 }
      ],
      topicScores: [
        { subject: "React Native", A: 85, fullMark: 100 },
        { subject: "Node REST API", A: 60, fullMark: 100 },
        { subject: "MongoDB Queries", A: 90, fullMark: 100 },
        { subject: "Express Routing", A: 75, fullMark: 100 }
      ]
    };

    // 3. Database se actual live user courses fetch karna
    const enrolledCourses = await Course.find().limit(3); 

    const recentQuizzes = [
      { _id: "q1", quizTitle: "MERN Architecture Evaluation", score: 85, createdAt: new Date() },
      { _id: "q2", quizTitle: "Asynchronous JavaScript Engine", score: 45, createdAt: new Date() }
    ];

    const recommendations = [
      { topic: "Node.js Stream Operations", suggestion: "Aapke async methods kamzor hain, cluster module ke patterns padhein." }
    ];

    const notifications = [
      { _id: "n1", title: "AI Diagnostics System Alert", message: "Mid-Review optimization criteria completed successfully on MongoDB Atlas." }
    ];

    // Response structural wrap exact according to teammate's destructured mapping
    res.status(200).json({
      success: true,
      data: {
        stats,
        enrolledCourses,
        recentQuizzes,
        recommendations,
        notifications
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Side Aggregation Error' });
  }
};

module.exports = { getStudentDashboard };