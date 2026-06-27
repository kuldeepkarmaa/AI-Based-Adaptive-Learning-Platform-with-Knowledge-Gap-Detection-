const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answerOptions: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
      rationale: { type: String } // 'Why' this option is correct/incorrect
    }
  ],
  hint: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true }, // Jaise: 'Java Loops', 'React Hooks'
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher ID
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);