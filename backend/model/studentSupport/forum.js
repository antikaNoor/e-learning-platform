const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    userWithQuestion: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
    },
    question: {
        type: String,
        required: true
    },
    answers: [{
        userWithAnswer: {
            type: mongoose.Types.ObjectId,
            ref: "Auth",
        },
        answer: {
            type: String
        }
    }],
    isAnswered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;
