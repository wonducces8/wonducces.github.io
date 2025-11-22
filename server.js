const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function appendMessage(message) {
  const filePath = path.join(DATA_DIR, 'contact-messages.json');
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  existing.push({ ...message, receivedAt: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
}

app.get('/api/activities', (_req, res) => {
  res.json(readJson('activities.json'));
});

app.get('/api/gallery', (_req, res) => {
  res.json(readJson('gallery.json'));
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  appendMessage({ name, email, message });
  res.status(201).json({ status: 'received' });
});

app.get('/api/status', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Troop 1941 server running at http://localhost:${PORT}`);
});
