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
    },
    documents: {
        type: [String]
    },
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
