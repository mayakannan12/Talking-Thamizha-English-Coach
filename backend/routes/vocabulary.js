const express = require('express');
const router = express.Router();

const wordBank = [
  { word: "Ambitious", meaning: "Having a strong desire to succeed", tamil: "லட்சியமுள்ள", example: "She is very ambitious about her career.", category: "personality" },
  { word: "Confident", meaning: "Feeling sure about yourself", tamil: "நம்பிக்கையான", example: "He spoke in a confident voice.", category: "personality" },
  { word: "Nervous", meaning: "Feeling worried or afraid", tamil: "பயம் / கவலை", example: "I feel nervous before interviews.", category: "emotion" },
  { word: "Opportunity", meaning: "A chance to do something good", tamil: "வாய்ப்பு", example: "This job is a great opportunity.", category: "career" },
  { word: "Communicate", meaning: "To share information or feelings", tamil: "தொடர்பு கொள்ள", example: "Good leaders communicate clearly.", category: "skill" },
  { word: "Fluent", meaning: "Speaking a language easily and well", tamil: "சரளமாக பேசுவது", example: "She speaks fluent English.", category: "language" },
  { word: "Determined", meaning: "Having a strong will to do something", tamil: "உறுதியான", example: "He is determined to learn English.", category: "personality" },
  { word: "Practice", meaning: "To do something repeatedly to improve", tamil: "பயிற்சி", example: "Daily practice makes you perfect.", category: "skill" },
  { word: "Vocabulary", meaning: "All the words a person knows", tamil: "சொல் அறிவு", example: "Reading books increases your vocabulary.", category: "language" },
  { word: "Interview", meaning: "A formal meeting to check if you are suitable for a job", tamil: "நேர்காணல்", example: "I have a job interview tomorrow.", category: "career" },
  { word: "Enthusiasm", meaning: "Strong excitement and interest", tamil: "உற்சாகம்", example: "She showed great enthusiasm in class.", category: "emotion" },
  { word: "Polite", meaning: "Being respectful and considerate", tamil: "கண்ணியமான", example: "Always be polite with customers.", category: "personality" },
  { word: "Achieve", meaning: "To successfully reach a goal", tamil: "சாதிக்க", example: "You can achieve anything with effort.", category: "motivation" },
  { word: "Patient", meaning: "Able to wait calmly without frustration", tamil: "பொறுமை", example: "Learning English requires being patient.", category: "personality" },
  { word: "Improve", meaning: "To get better at something", tamil: "மேம்படுத்த", example: "Practice daily to improve your English.", category: "skill" },
  { word: "Greet", meaning: "To say hello to someone", tamil: "வணக்கம் சொல்ல", example: "Always greet customers with a smile.", category: "social" },
  { word: "Apologize", meaning: "To say sorry for a mistake", tamil: "மன்னிப்பு கேட்க", example: "I apologize for being late.", category: "social" },
  { word: "Describe", meaning: "To explain what something is like", tamil: "விவரிக்க", example: "Can you describe your hometown?", category: "communication" },
  { word: "Suggest", meaning: "To recommend an idea", tamil: "பரிந்துரைக்க", example: "I suggest you practice daily.", category: "communication" },
  { word: "Courage", meaning: "The ability to do something even when you are afraid", tamil: "தைரியம்", example: "It takes courage to speak in public.", category: "motivation" },
  { word: "Honest", meaning: "Telling the truth always", tamil: "நேர்மையான", example: "Be honest in your interview.", category: "personality" },
  { word: "Schedule", meaning: "A plan for when things will happen", tamil: "நேர அட்டவணை", example: "Follow a daily study schedule.", category: "career" },
  { word: "Respect", meaning: "Treating others with care and kindness", tamil: "மரியாதை", example: "Respect your teachers and elders.", category: "social" },
  { word: "Mistake", meaning: "Something done incorrectly", tamil: "தவறு", example: "Mistakes help you learn and grow.", category: "learning" },
  { word: "Progress", meaning: "Moving forward and improving", tamil: "முன்னேற்றம்", example: "Track your daily English progress.", category: "motivation" },
  { word: "Explain", meaning: "To make something clear and easy to understand", tamil: "விளக்குவது", example: "Can you explain this word to me?", category: "communication" },
  { word: "Listen", meaning: "To pay attention to what someone is saying", tamil: "கேட்பது", example: "Listen carefully in meetings.", category: "skill" },
  { word: "Express", meaning: "To show your thoughts or feelings", tamil: "வெளிப்படுத்த", example: "Express your ideas clearly.", category: "communication" },
  { word: "Introduce", meaning: "To present yourself or someone else for the first time", tamil: "அறிமுகப்படுத்த", example: "Introduce yourself in the interview.", category: "social" },
  { word: "Dedicate", meaning: "To give time and effort to something", tamil: "அர்ப்பணிக்க", example: "Be dedicated to daily English practice.", category: "motivation" }
];

// GET /api/vocabulary/daily - Get word of the day based on date
router.get('/daily', (req, res) => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const word = wordBank[dayOfYear % wordBank.length];
  res.json({ success: true, data: word });
});

// GET /api/vocabulary/all - Get all words
router.get('/all', (req, res) => {
  res.json({ success: true, data: wordBank, total: wordBank.length });
});

// GET /api/vocabulary/quiz - Get 4 random words for quiz
router.get('/quiz', (req, res) => {
  const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
  const quizWords = shuffled.slice(0, 4).map(w => ({
    word: w.word,
    meaning: w.meaning,
    tamil: w.tamil,
    example: w.example,
    options: [
      w.meaning,
      wordBank[Math.floor(Math.random() * wordBank.length)].meaning,
      wordBank[Math.floor(Math.random() * wordBank.length)].meaning,
      wordBank[Math.floor(Math.random() * wordBank.length)].meaning
    ].sort(() => Math.random() - 0.5)
  }));
  res.json({ success: true, data: quizWords });
});

// GET /api/vocabulary/category/:cat
router.get('/category/:cat', (req, res) => {
  const filtered = wordBank.filter(w => w.category === req.params.cat);
  res.json({ success: true, data: filtered });
});

module.exports = router;
