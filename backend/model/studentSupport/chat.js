const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Types.ObjectId],
        ref: "Auth"
    },
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
