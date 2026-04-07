const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 1 },
  lastActive: { type: Date, default: Date.now },
  savedWords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  weakWords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  wordsLearned: [{
    word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
    learnedAt: { type: Date, default: Date.now }
  }],
  badges: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
