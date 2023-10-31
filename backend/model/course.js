const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        unique: true,
        required: [true, "Course title should be provided"]
    },
    description: {
        type: String,
        required: [true, "Decsription should be provided"]
    },
    instructorID: {
        type: mongoose.Types.ObjectId,
        ref: "User"
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
    isPremium: {
        type: Boolean,
        default: false
    },
    numberOfStudentsEnrolled: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryReference: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    reviewReference: {
        type: [mongoose.Types.ObjectId],
        ref: "Review"
    },
    courseContent: {
        type: [mongoose.Types.ObjectId],
        ref: "Lesson"
    }

}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;