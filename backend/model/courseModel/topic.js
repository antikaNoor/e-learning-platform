const mongoose = require("mongoose")

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        maxLength: 20,
        unique: true,
        required: [true, "Topic name should be provided"]
    },

})

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;