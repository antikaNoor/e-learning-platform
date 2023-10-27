const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    courseReference: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userReference: {
        type: mongoose.Types.ObjectId,
        ref: "User",
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
        ref: "User"
    },
    dislikes: {
        type: [mongoose.Types.ObjectId],
        ref: "User"
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;