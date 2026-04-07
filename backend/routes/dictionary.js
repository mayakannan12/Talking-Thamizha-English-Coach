const express = require('express');
const router = express.Router();
const axios = require('axios');
const Word = require('../models/Word'); // Assuming we use this later when MongoDB connects

// POST /api/dictionary/search
router.post('/search', async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) return res.status(400).json({ error: 'Word is required' });

    const apiKey = process.env.GEMINI_API_KEY;

    // AI Prompt specifically designed for Talking Thamizha Vocabulary
    const prompt = `
You are the AI engine for "Talking Thamizha Vocabulary", an advanced English learning platform.
Provide a comprehensive dictionary profile for the word: "${word}"

Return ONLY a valid JSON object with the following exact structure (no markdown tags):
{
  "word": "${word}",
  "meaning": "Detailed dictionary meaning",
  "simpleMeaning": "Simple 1-line explanation for beginners",
  "tamilMeaning": "Tamil translation/meaning string",
  "partOfSpeech": "e.g., Noun, Verb, Adjective",
  "level": "Easy / Medium / Hard / Advanced",
  "synonyms": ["word1", "word2", "word3"],
  "antonyms": ["word1", "word2"],
  "examples": ["Example sentence 1", "Example sentence 2", "Example sentence 3", "Example sentence 4", "Example sentence 5"],
  "origin": "Etymology or origin of the word",
  "commonMistakes": "Common mistakes learners make when using this word",
  "usageTips": "Tips on how to effectively use this word naturally",
  "formalInformal": "Is it formal, informal, slang, or academic?"
}
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3, // precise facts
          responseMimeType: "application/json"
        }
      }
    );

    const rawText = response.data.candidates[0].content.parts[0].text;
    const wordData = JSON.parse(rawText);

    res.json(wordData);
  } catch (err) {
    console.error('Dictionary AI Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate dictionary profile' });
  }
});

module.exports = router;

