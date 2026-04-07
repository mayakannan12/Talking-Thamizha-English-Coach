require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const chatRoutes = require('./routes/chat');
const vocabularyRoutes = require('./routes/vocabulary');
const dictionaryRoutes = require('./routes/dictionary');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: { error: 'Too many requests. Please slow down!' }
});
app.use('/api/', limiter);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/dictionary', dictionaryRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Talking Thamizha Backend Running 🚀', time: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Talking Thamizha Backend running on http://localhost:${PORT}`);
  console.log(`🧠 AI Coach ready to help Tamil users learn English!\n`);
});

