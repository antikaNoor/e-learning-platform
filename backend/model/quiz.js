const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    courseReference: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }]
    }],
    timeLimit: {
        type: Number, // Time limit for the quiz in seconds
        required: true
    }
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
