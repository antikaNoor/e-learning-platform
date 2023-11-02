const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    courseReference: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    studentReference: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    quizScore: {
        type: Number,
        default: 0,
    },
    assignmentScore: {
        type: Number,
        default: 0,
    },
    isPassed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = Evaluation;
