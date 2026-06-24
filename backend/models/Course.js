const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [
    {
      moduleName: { type: String, required: true },
      lessons: [{ title: { type: String, required: true }, content: String }]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);