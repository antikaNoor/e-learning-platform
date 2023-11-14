const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    endQuizTime: {
        type: Date
    },
    quizAnswer: {
        type: [String],
    },
    quizScore: {
        type: Number,
        default: 0,
    },
    assignmentAnswer: {
        type: String,
        default: null
    },
    assignmentScore: {
        type: Number,
        default: 0,
    },
    isPassedInQuiz: {
        type: Boolean,
        default: false
    },
    chance: {
        type: Number,
        default: 0
    },
    isPassedInAssignment: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = Evaluation;
