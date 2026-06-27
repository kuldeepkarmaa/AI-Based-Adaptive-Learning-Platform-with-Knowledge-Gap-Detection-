const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true // The weak topic targeted for remediation (e.g., "JVM Internals")
  },
  flashcards: [
    {
      front: { type: String, required: true }, // The core technical question/concept
      back: { type: String, required: true }   // The precise, direct explanation/answer
    }
  ],
  studyNotes: {
    type: String, // A brief, 3-4 bullet-point executive summary from AI
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', RecommendationSchema);