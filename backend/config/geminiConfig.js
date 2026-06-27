const { GoogleGenAI } = require('@google/genai');

// 1. Initialize the instance here once using your .env key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 2. Export the ready-to-use 'ai' instance directly
module.exports = ai;