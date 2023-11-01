const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userReference: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    courseReference: {
        type: [mongoose.Types.ObjectId],
        ref: "Course",
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;