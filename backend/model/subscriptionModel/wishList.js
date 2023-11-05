const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true
    },
    courseID: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    }
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
