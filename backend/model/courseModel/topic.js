const mongoose = require("mongoose")

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        maxLength: 20,
        unique: true,
        required: [true, "Topic name should be provided"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
})

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;