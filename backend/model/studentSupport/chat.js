const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: [{
        user1: {
            type: mongoose.Types.ObjectId,
            ref: "Auth",
            required: true
        },
        user2: {
            type: mongoose.Types.ObjectId,
            ref: "Auth",
            required: true
        }
    }],
    messages: [{
        sender: {
            type: mongoose.Types.ObjectId,
            ref: "Auth",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
