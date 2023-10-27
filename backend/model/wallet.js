const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userReference: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    transactions: {
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
}, { timestamps: true });

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
