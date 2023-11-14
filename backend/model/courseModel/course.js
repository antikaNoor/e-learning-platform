const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
        required: [true, "Decsription should be provided"]
    },
    teacherID: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    },
    language: {
        type: String,
        enum: ["English", "Bangla"],
    },
    learingOutcome: {
        type: String
    },
    requirement: {
        type: [String]
    },
    // thumbnail: {
    //     type: String,
    //     required: [true, "Thumbnail should be provided"]
    // },
    isApproved: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    topicID: {
        type: mongoose.Types.ObjectId,
        ref: "Topic"
    },
    lessonID: {
        type: [mongoose.Types.ObjectId],
        ref: "Lesson"
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [mongoose.Types.ObjectId],
        ref: "Review"
    },

}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;