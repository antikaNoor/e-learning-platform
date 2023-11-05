const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
    },
    courseID: {
        type: [mongoose.Types.ObjectId],
        ref: "Course",
    }
}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;