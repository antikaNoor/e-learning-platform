const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userReference: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }]
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
