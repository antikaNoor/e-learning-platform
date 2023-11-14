const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({
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
    completedLessons: {
        type: [mongoose.Types.ObjectId],
        ref: "Lesson",
    },
    percentage: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress