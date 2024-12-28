const express = require('express');
const { OpenAI } = require("openai"); // Import from the openai library
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Initialize OpenAI client with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI API endpoint
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use gpt-4o model
      messages: [
        { "role": "user", "content": prompt } // Use the user's prompt
      ]
    });

    res.json({ result: completion.choices[0].message.content }); // Send back the generated text
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
