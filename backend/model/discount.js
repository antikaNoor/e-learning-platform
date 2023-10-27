const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    courseReference: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    onGoing: {
        type: Boolean
    }
});

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;