const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true // Act as the prompt target vector for Gemini AI tracking
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true
      },
      answerOptions: [
        {
          text: { type: String, required: true },
          rationale: { type: String } // Why it's correct/incorrect provided by AI
        }
      ],
      hint: {
        type: String
      },
      difficulty: {
        type: String,
        default: 'Advanced'
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);