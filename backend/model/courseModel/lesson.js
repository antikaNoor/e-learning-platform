const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    serialNo: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        maxLength: 100,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
    },
    videos: {
        type: [String],
    },

    // Array of note files
    notes: {
        type: [String],
    },
    // Unenrolled students cannot watch all the lessons. They may access just the intro video.
    isAccessibleToUnenrolled: {
        type: Boolean,
        default: false
    },
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