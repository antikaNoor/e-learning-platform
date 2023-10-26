const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Password should be provided"],
    },
    role: {
        type: String,
        enum: ["admin", "instructor", "student"],
        required: true,
        default: "student"
    },
    isApprovedInstructor: {
        type: Boolean,
        default: false
    },
    educationalCertificates: {
        type: String, // Store the file path or URL of the uploaded PDF certificate
        default: null
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    enrolledCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    loginAttempt: {
        type: Number,
        default: 0
    },
    resetPassword: {
        type: Boolean || null,
        default: false
    },
    resetPasswordToken: {
        type: String || null,
        default: null
    },
    resetPasswordExpired: {
        type: Date || null,
        default: null
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true })

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;