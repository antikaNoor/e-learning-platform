const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
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
        required: true,
        default: "student"
    },
    // for students
    enrolledCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    completedCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    }
}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;