// services/openAIService.js
const axios = require('axios');

const openAIKey = process.env.OPENAI_API_KEY;

exports.generateScriptFromPrompt = async (prompt) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a podcast scriptwriter.' },
        { role: 'user', content: `Write a short podcast script based on: ${prompt}` },
      ],
      temperature: 0.8,
      max_tokens: 600
    },
    {
      headers: {
        Authorization: `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
};
