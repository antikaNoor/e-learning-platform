const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["course_creation", "subscription_request", "subscription_approval", "content_update"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread"
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
