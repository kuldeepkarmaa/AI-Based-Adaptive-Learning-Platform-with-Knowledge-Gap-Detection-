const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const ai = require('../config/geminiConfig'); // Directly import the initialized ai client

// @desc    Automatically generate structured quiz questions using Gemini AI
// @route   POST /api/ai/generate-quiz
// @access  Private (Teacher or Admin)
const generateAIQuiz = async (req, res) => {
  try {
    const { title, topic, courseId, difficulty, numberOfQuestions } = req.body;

    // 1. Security Check
    if (req.user.role.toLowerCase() !== 'teacher' && req.user.role.toLowerCase() !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Unauthorized role.' });
    }

    // 2. Validate linked Course existence
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ success: false, message: 'Target course not found.' });
    }

    // 3. Construct the prompt with strict output formatting rules
    const prompt = `
      You are an expert computer science professor. Generate a high-quality educational quiz in strict JSON format based on the following parameters:
      - Topic: ${topic}
      - Difficulty Level: ${difficulty || 'Medium'}
      - Number of Questions: ${numberOfQuestions || 3}
      
      The response MUST be a valid JSON array containing objects matching this structural schema exactly, written entirely in clean technical English:
      [
        {
          "questionText": "Clear, precise technical question statement here.",
          "answerOptions": [
            { "text": "Option A text", "isCorrect": false, "rationale": "Explanation for why this option is wrong." },
            { "text": "Option B text", "isCorrect": true, "rationale": "Explanation for why this option is correct." },
            { "text": "Option C text", "isCorrect": false, "rationale": "Explanation for why this option is wrong." }
          ],
          "hint": "A subtle conceptual clue to guide the student without revealing the direct answer.",
          "difficulty": "${difficulty || 'Medium'}"
        }
      ]
      
      Do not wrap the response in markdown blocks like \`\`\`json. Return ONLY the raw JSON string array.
    `;

    // 4. Invoke the Gemini API using the ready client
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const aiText = response.text.trim();
    
    // 5. Parse the AI string response directly into an executable JS Array
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(aiText);
    } catch (parseError) {
      return res.status(500).json({ 
        success: false, 
        message: 'AI failed to deliver structured JSON. Please try again.', 
        error: parseError.message 
      });
    }

    // 6. Automatically save the AI-generated quiz straight to MongoDB Atlas
    const newQuiz = await Quiz.create({
      title,
      topic,
      courseId,
      creator: req.user._id,
      questions: parsedQuestions
    });

    res.status(201).json({
      success: true,
      message: 'AI Quiz generated and saved successfully to database.',
      data: newQuiz
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server-side AI processing error.', error: error.message });
  }
};

module.exports = { generateAIQuiz };