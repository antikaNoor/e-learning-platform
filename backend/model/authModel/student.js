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
    enrolledCourses: [{
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course"
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    }],
    completedCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    wishList: {
        type: [mongoose.Types.ObjectId],
        ref: "WishList"
    },
    Cart: {
        type: [mongoose.Types.ObjectId],
        ref: "Cart"
    },

}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;