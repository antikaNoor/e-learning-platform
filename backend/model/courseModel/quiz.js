const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questions: [{
        questionText: {
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
        required: true
    },
    passMarks: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
