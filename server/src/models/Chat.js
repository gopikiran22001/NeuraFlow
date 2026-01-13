const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    resume_text: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'New Chat',
    }
}, {
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
