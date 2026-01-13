const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('resume_file'), async (req, res) => {
    let { resume_text, job_description, previous_output } = req.body;

    if (req.file) {
        try {
            if (req.file.mimetype === 'application/pdf') {
                const dataBuffer = fs.readFileSync(req.file.path);
                const data = await pdfParse(dataBuffer);
                resume_text = data.text;
            } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const result = await mammoth.extractRawText({ path: req.file.path });
                resume_text = result.value;
            }
            fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error("File processing error:", error);
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Error processing resume file' });
        }
    }

    let effectivePreviousOutput = previous_output;

    if (!effectivePreviousOutput && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const userId = decoded.id;

            const lastChat = await Chat.findOne({ user: userId }).sort({ updatedAt: -1 });

            if (lastChat && lastChat.messages && lastChat.messages.length > 0) {
                for (let i = lastChat.messages.length - 1; i >= 0; i--) {
                    if (lastChat.messages[i].role === 'assistant') {
                        effectivePreviousOutput = lastChat.messages[i].content;
                        break;
                    }
                }
            }
        } catch (e) {
            console.log("Failed to fetch previous output from DB:", e.message);
        }
    }

    try {
        const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/ai/query`, {
            resume_text,
            job_description,
            previous_output: effectivePreviousOutput
        });

        const aiOutput = aiResponse.data.ai_output;
        res.json({ ai_output: aiOutput });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI Service Error' });
    }
});

router.post('/save', protect, async (req, res) => {
    const { messages, chatId, title, resume_text, job_description } = req.body;

    try {
        let chat;
        if (chatId) {
            chat = await Chat.findById(chatId);
            if (chat.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            chat.messages = messages;
        } else {
            console.log("Creating new chat with resume len:", resume_text?.length);
            chat = new Chat({
                user: req.user._id,
                messages,
                title: title || 'Interview Prep',
                resume_text,
                job_description
            });
        }

        const savedChat = await chat.save();
        res.json(savedChat);
    } catch (error) {
        console.error("Save error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/history', protect, async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ message: 'Chat not found' });

        if (chat.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
