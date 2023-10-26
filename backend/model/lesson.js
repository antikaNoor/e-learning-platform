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
        // required: [true, "Video file name should be provided"]
    },
    videoFilePath: {
        type: String,
        // required: [true, "Video file path should be provided"]
    },

}, { timestamps: true })

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;