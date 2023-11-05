const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
    userWithQuestion: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    userWithAnswer: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: null
    },
    isAnswered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;
