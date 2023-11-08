const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true
        },
        correctOption: {
            type: Number,
            required: true
        }
    }],
    totalMarks: {
        type: Number,
    },
    passMarks: {
        type: Number,
    },
    duration: {
        type: Number,
    }
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
