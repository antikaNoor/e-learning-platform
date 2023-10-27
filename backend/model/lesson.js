const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        unique: true,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
        unique: true,
        required: [true, "Decsription should be provided"]
    },
    videoFileName: {
        type: String,
    },
    videoFilePath: {
        type: String,
    },
    // Unenrolled students cannot watch all the lessons. They may access just the intro video.
    accessibleToUnenrolled: {
        type: Boolean,
        default: false
    },
    // To keep track of the exact moment the video was paused by an enrolled student.
    progress: [{
        userReference: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        videoLastPlayedDuration: {
            type: Number, // Store the video duration where the student left off
            default: 0 // Default value is 0 seconds
        }
    }],
    courseReference: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    }

}, { timestamps: true })

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;