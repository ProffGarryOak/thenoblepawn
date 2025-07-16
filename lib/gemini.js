import axios from 'axios';

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function callGeminiAI(payload) {
  const res = await axios.post(GEMINI_API_URL, payload, {
    headers: {
      'Authorization': `Bearer ${GEMINI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
} 