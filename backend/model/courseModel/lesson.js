const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
        required: [true, "Decsription should be provided"]
    },
    videoFilePath: {
        type: String,
    },
    // Unenrolled students cannot watch all the lessons. They may access just the intro video.
    isAccessibleToUnenrolled: {
        type: Boolean,
        default: false
    },
    // To keep track of the exact moment the video was paused by an enrolled student.
    progressofStudent: [{
        StudentID: {
            type: mongoose.Types.ObjectId,
            ref: "Student"
        },
        videoLastPlayedDuration: {
            type: Number, // Store the video duration where the student left off
            default: 0 // Default value is 0 seconds
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        default: null
    }
}, { timestamps: true })

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;