const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk memproses body dari request
app.use(bodyParser.json());

// Data pesan chatbot
let chatbotMessages = [];

// Endpoint untuk mendapatkan semua pesan chatbot
app.get('/api/chatbot/messages', (req, res) => {
    res.json(chatbotMessages);
});

// Endpoint untuk menambahkan pesan baru ke chatbot
app.post('/api/chatbot/messages', (req, res) => {
    const newMessage = req.body.message;
    chatbotMessages.push({ text: newMessage });
    res.json({ message: newMessage });
});

// Endpoint untuk menghapus semua pesan chatbot
app.delete('/api/chatbot/messages', (req, res) => {
    chatbotMessages = [];
    res.sendStatus(204);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
