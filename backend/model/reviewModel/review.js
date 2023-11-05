const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: "Auth"
    },
    dislikes: {
        type: [mongoose.Types.ObjectId],
        ref: "Auth"
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;