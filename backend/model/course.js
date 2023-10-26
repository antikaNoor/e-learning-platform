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
        unique: true,
        required: [true, "Decsription should be provided"]
    },
    price: {
        type: Number,
        required: [true, "Price should be provided"]
    },
    instructor: {
        type: String
    },
    language: {
        type: String
    },
    learing_outcome: {
        type: String
    },
    requirement: {
        type: [String]
    },
    category_ref: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    review_ref: {
        type: [mongoose.Types.ObjectId],
        ref: "Review"
    },
    course_content_ref: {
        type: [mongoose.Types.ObjectId],
        ref: "Lesson"
    }

}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;