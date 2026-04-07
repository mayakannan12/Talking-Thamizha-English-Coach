const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  simpleMeaning: { type: String },
  tamilMeaning: { type: String },
  partOfSpeech: { type: String },
  level: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Advanced'], default: 'Medium' },
  categories: [{ type: String }],
  examples: [{ type: String }],
  synonyms: [{ type: String }],
  antonyms: [{ type: String }],
  origin: { type: String },
  commonMistakes: { type: String },
  usageTips: { type: String },
  formalInformal: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Word', wordSchema);
