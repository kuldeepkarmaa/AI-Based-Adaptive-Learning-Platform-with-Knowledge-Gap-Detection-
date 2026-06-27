const Quiz = require('../models/Quiz');
const ai = require('../config/geminiConfig');

// @desc    Generate an advanced automated evaluation track using Gemini AI
// @route   POST /api/quiz/generate
// @access  Private
const generateAIQuiz = async (req, res) => {
  try {
    const { title, topic, courseId, difficulty, numberOfQuestions } = req.body;

    if (!topic || !courseId) {
      return res.status(400).json({ success: false, message: 'Please provide a target topic and linked course context.' });
    }

    const questionCount = numberOfQuestions || 3;
    const targetDifficulty = difficulty || 'Advanced';

    const prompt = `
      You are an elite automated examination software engine.
      The professor wants to generate an evaluation track under the specific topic scope heading: "${topic}".
      Target difficulty level constraints: "${targetDifficulty}".
      
      Generate exactly ${questionCount} distinct multiple choice questions based on this.
      Return ONLY a raw valid JSON array matching this strict schema structure without markdown wraps or code blocks:
      [
        {
          "questionText": "Clear conceptual question string?",
          "answerOptions": [
            { "text": "Option A text content", "rationale": "Why option A is correct or incorrect" },
            { "text": "Option B text content", "rationale": "Why option B is correct or incorrect" },
            { "text": "Option C text content", "rationale": "Why option C is correct or incorrect" },
            { "text": "Option D text content", "rationale": "Why option D is correct or incorrect" }
          ],
          "hint": "A strategic conceptual hint string.",
          "difficulty": "${targetDifficulty}"
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(response.text.trim());
    } catch (parseError) {
      return res.status(500).json({ success: false, message: 'AI layout text structural anomaly. Try again.' });
    }

    const newQuiz = await Quiz.create({
      title: title || `AI Evaluation: ${topic}`,
      topic,
      courseId,
      creator: req.user._id,
      questions: parsedQuestions
    });

    res.status(201).json({ success: true, message: 'Dynamic AI track compiled!', data: newQuiz });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error triggering dynamic quiz compiler.', error: error.message });
  }
};

module.exports = { generateAIQuiz };