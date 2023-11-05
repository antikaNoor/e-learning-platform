const topicModel = require("../../model/courseModel/topic");
const categoryModel = require("../../model/courseModel/category");
const courseModel = require("../../model/courseModel/course");
const { success, failure } = require("../../utils/successError");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

class TopicController {
  async createValidation(req, res, next) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res.status(400).send({ message: "Validation error", validation });
      }
      next();
    } catch (error) {
      console.log("Error has occurred");
    }
  }

  async createTopic(req, res) {
    try {
      const { topicName, categoryID } = req.body;

      if (!topicName || !categoryID) {
        return res.status(400).send(failure("Please enter topic name and category ID."));
      }

      // Check if the category exists
      const existingCategory = await categoryModel.findOne({
        _id: new mongoose.Types.ObjectId(categoryID),
      });

      if (!existingCategory || existingCategory.isDeleted) {
        return res.status(400).send(failure("Invalid or deleted category ID."));
      }

      // Check if the topic name already exists
      const existingTopic = await topicModel.findOne({ topicName, categoryID });

      if (existingTopic && existingTopic.isDeleted === false) {
        return res.status(400).send(failure("Topic name already exists within the category."));
      }

      if (existingTopic && existingTopic.isDeleted === true) {
        existingTopic.isDeleted = false;
        await existingTopic.save();
        return res.status(200).send(success("Topic created successfully"));
      }

      const topic = new topicModel({
        topicName,
        categoryID,
      });

      await topic.save();
      return res.status(200).send(success("Topic created successfully"));
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send(failure("Internal server error"));
    }
  }

  async deleteTopic(req, res) {
    try {
      const { topicID } = req.body;

      const existingTopic = await topicModel.findOne({
        _id: new mongoose.Types.ObjectId(topicID),
      });
      if (!existingTopic) {
        return res.status(400).send(failure("Topic not found."));
      }

      const associatedCourse = await courseModel.findOne({
        topicID: new mongoose.Types.ObjectId(topicID),
      })

      if (associatedCourse) {
        // delete the topicID from course
        associatedCourse.topicID = null;
        await associatedCourse.save();
      }

      // Soft delete
      existingTopic.isDeleted = true;
      await existingTopic.save();

      return res.status(200).send(success("Topic deleted successfully"));

    } catch (error) {
      console.log("Error", error);
      return res.status(500).send(failure("Internal server error"));
    }
  }
}

module.exports = new TopicController();
