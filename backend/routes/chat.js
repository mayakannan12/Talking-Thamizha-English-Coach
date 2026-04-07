const express = require('express');
const router = express.Router();
const axios = require('axios');
const generateSystemPrompt = require('../prompts/systemPrompt');

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, history = [], profile = {}, settings = {} } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({ error: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env file.' });
    }

    // Generate adaptive prompt
    const systemPrompt = generateSystemPrompt(profile, settings);

    // Build conversation history for context
    const conversationContext = history
      .slice(-6) // last 6 messages
      .map(h => `${h.role === 'user' ? 'User' : 'Talking Thamizha'}: ${h.content}`)
      .join('\n');

    const fullPrompt = conversationContext
      ? `${systemPrompt}\n\nConversation so far:\n${conversationContext}\n\nUser: ${message}`
      : `${systemPrompt}\n\nUser: ${message}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          responseMimeType: "application/json"
        }
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const aiResponse = JSON.parse(jsonMatch[0]);

    res.json({
      success: true,
      data: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Chat error:', err.message);

    if (err.response?.status === 400) {
      return res.status(400).json({ error: 'Invalid request to AI service.' });
    }
    if (err.response?.status === 429) {
      return res.status(429).json({ error: 'AI service rate limit reached. Try again shortly.' });
    }
    if (err.message === 'Invalid AI response format') {
      return res.status(500).json({ error: 'AI returned unexpected format. Please try again.' });
    }

    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
});

// GET /api/chat/greeting
router.get('/greeting', (req, res) => {
  res.json({
    success: true,
    data: {
      reply: "Vanakkam! 🙏 I am Talking Thamizha, your personal English speaking coach! You can talk to me in Tamil, Thanglish, or English. Let's start your journey!",
      correction: null,
      explanation: null,
      vocabulary: {
        word: "Journey",
        meaning: "a long trip or experience",
        tamil: "பயணம்",
        example: "Learning English is a beautiful journey."
      },
      level: "beginner",
      mode: "conversation",
      scenario: "general",
      followup: "Tell me your name and why you want to learn English!",
      encouragement: "Every expert was once a beginner. You've got this! 💪"
    }
  });
});

module.exports = router;

