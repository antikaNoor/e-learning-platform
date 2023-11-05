const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    cartID: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;