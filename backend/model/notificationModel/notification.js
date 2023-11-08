const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["teacher_approval", "subscription_approval", "course_approval", "subscription_request"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        default: null
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread"
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
