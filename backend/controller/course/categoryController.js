const categoryModel = require("../../model/courseModel/category")
const topicModel = require("../../model/courseModel/topic")
const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

class CategoryController {
    async createValiadtion(req, res, next) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                return res.status(400).send({ message: "validation error", validation })
            }
            next()
        } catch (error) {
            console.log("error has occured")
        }
    }

    async createCategory(req, res) {
        try {

            const { categoryName } = req.body

            if (!categoryName) {
                return res.status(400).send(failure("Please enter category name."))
            }

            const existingCategory = await categoryModel.findOne({ categoryName })

            if (existingCategory && existingCategory.isDeleted === false) {
                return res.status(400).send(failure("Category name already exists."))
            }

            if (existingCategory && existingCategory.isDeleted === true) {
                existingCategory.isDeleted = false
                await existingCategory.save()
                return res.status(200).send(success("Category created successfully"))
            }

            const category = new categoryModel({
                categoryName
            })

            await category.save()
            return res.status(200).send(success("Category created successfully"))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete a category
    async deleteCategory(req, res) {
        try {
            const { categoryID } = req.body

            const existingCategory = await categoryModel.findOne({ _id: new mongoose.Types.ObjectId(categoryID) })
            if (!existingCategory) {
                return res.status(400).send(failure("Category not found."))
            }

            // Orphanize topics
            await topicModel.updateMany({ categoryID: existingCategory._id }, { $unset: { categoryID: 1 } });

            // soft delete
            existingCategory.isDeleted = true
            await existingCategory.save()
            return res.status(200).send(success("Category deleted successfully"))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CategoryController()