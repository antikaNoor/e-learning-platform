const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        maxLength: 20,
        unique: true,
        required: [true, "Category name should be provided"]
    }
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;