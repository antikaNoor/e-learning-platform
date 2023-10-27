const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 50,
        unique: true,
        required: [true, "Username should be provided"]
    },
    email: {
        type: String,
        maxLength: 100,
        unique: true,
        required: [true, "Email should be provided"]
    },
    role: {
        type: String,
        enum: ["admin", "instructor", "student"],
        required: true,
        default: "student"
    },
    enrolledCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    completedCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    favouriteCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;