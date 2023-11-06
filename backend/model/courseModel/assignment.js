const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    responses: [{
        studentID: {
            type: mongoose.Types.ObjectId,
            ref: "Student",
        },
        answer: {
            type: String
        },
        submissionDate: {
            type: Date
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

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
