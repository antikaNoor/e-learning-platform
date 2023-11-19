const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
    },
    videos: [{
        videoTitle: {
            type: String,
            required: true
        },
        videoLink: {
            type: String,
            required: true
        },
    }],

    // Array of note files
    notes: [{
        noteTitle: {
            type: String,
            required: true
        },
        noteLink: {
            type: String,
            required: true
        },
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