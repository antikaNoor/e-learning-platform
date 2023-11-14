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
    progess: {
        type: Number,
        default: 0
    },
    
}, { timestamps: true })

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress