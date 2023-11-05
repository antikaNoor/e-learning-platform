const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["course_creation", "subscription_request", "subscription_approval", "course_approval"],
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
