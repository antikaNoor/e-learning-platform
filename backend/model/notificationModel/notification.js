const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["teacher_approval", "course_approval", "subscription_request", "course_subscribed"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    from: {
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
