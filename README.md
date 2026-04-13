# 🧠 Talking Thamizha English Coach

Welcome to **Talking Thamizha**, a World-Class AI-powered platform designed to guide Tamil speakers from beginner English to world-level fluency. Featuring real-time scenario roleplays, deep grammar corrections, global vocabulary modules, and dynamic personalized profiles.

Build using the **MERN** Stack (MongoDB, Express, React, Node.js) and deeply integrated with the cutting-edge **Google Gemini 2.5 Flash** AI engine.

---

## 🌟 Key Features

### 💬 Adaptive Conversational AI
- **Thanglish Support:** Users can comfortably type or speak in Tamil, Thanglish, or English.
- **Smart Correction:** Every message evaluates pronunciation, grammar, and sentence structure. Corrected sentences are mapped directly back to the user with explanations.
- **Dynamic Scenario Generation:** Instantly warp into realistic environments like Job Interviews, Airport Check-ins, or casual Shopping trips for safe learning.

### 📚 Global Vocabulary AI
- **100+ Learning Categories:** IELTS, TOEFL, Business, Slang, Technology, Medical, and many more.
- **Instant AI Dictionary:** Search any word and dynamically receive 12+ data points:
  - Meaning in English & Tamil
  - Simple explanations
  - Real-world context examples
  - Synonyms & Antonyms
  - Etymology (Origin) & Common learner mistakes
- **Speech Synthesis:** Hear pronunciation native to the browser.

### ⚙️ Deep Personalization (Profile & Settings)
- **Fluid Difficulty System:** Configure levels between Beginner, Intermediate, and Advanced.
- **Adaptive Goal Parameters:** Set goals (e.g., "College Presentation") which automatically influence the AI's questioning logic and vocabulary teaching vectors.
- **Confidence Modes:** Choose between Gentle, Normal, and Strict correction schemas.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Vanilla CSS Modules (Glassmorphism & Neon UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose schemas)
- **AI Engine:** Google Gemini (v1beta/gemini-2.5-flash:generateContent API)
- **APIs:** HTML5 Web Speech API (TTS)

---

## 🚀 Quick Start Guide

### Prerequisites
1. **Node.js** (v18.x or higher)
2. **NPM** or **Yarn**
3. **Google Gemini API Key** (Get yours from [AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mayakannan12/Talking-Thamizha-English-Coach.git
   cd Talking-Thamizha-English-Coach
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` folder:
   ```env
   PORT=5000
   GEMINI_API_KEY=AIzaSyBKq37KdzAWgmxwJKGup70-0ExwhCC6Ghc
   NODE_ENV=development
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App
Open two terminal windows.

**Terminal 1 (Backend Server):**
```bash
cd backend
npm start
```

**Terminal 2 (React Frontend):**
```bash
cd frontend
npm start
```
The application will launch locally at `http://localhost:3000`.

---

## 📁 Project Structure

```
Talking-Thamizha-English-Coach/
│
├── backend/                  # Express/Node JS Source
│   ├── models/               # MongoDB Schemas (User.js, Word.js)
│   ├── prompts/              # Dynamic AI Prompt injection generators
│   ├── routes/               # Express endpoints (chat, vocabulary, dictionary)
│   ├── .env                  # Backend secrets 
│   └── server.js             # Root server orchestrator
│
├── frontend/                 # React JS Source
│   ├── src/
│   │   ├── components/       # Shared UI architecture (Navbar, etc.)
│   │   ├── pages/            # Core views (Chat, Practice, Vocab, Profile)
│   │   ├── App.js            # Router & state manager
│   │   └── index.css         # Massive global CSS design library 
│   └── package.json
│
└── README.md
```

---

*Made with ❤️ for Tamil learners globally.*
