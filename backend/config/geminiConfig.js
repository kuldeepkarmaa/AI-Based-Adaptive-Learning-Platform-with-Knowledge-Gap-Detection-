const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // <-- Yeh line yahan confirm honi chahiye taaki key pehle load ho sake

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

module.exports = ai;