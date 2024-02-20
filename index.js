const dotenv = require('dotenv');
dotenv.config();
const api = process.env.API_KEY;
const url = 'https://api.openai.com/v1/images/generations';

const express = require('express');

const app = express();
app.listen(8050, () => console.log('Server running on port 8050'));
app.use(express.json());
app.use(express.static('public'));

app.post('/api/generate', async (req, res) => {
  const api = process.env.API_KEY;
  const url = 'https://api.openai.com/v1/images/generations';
  const userInput = req.body.prompt;

  const methods = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${api}`,
    },
    body: JSON.stringify({
      prompt: userInput,
      n: 3,
      size: '256x256',
    }),
  };

  try {
    const response = await fetch(url, methods);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
