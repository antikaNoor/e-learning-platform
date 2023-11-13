const courseModel = require("../../model/courseModel/course")
const authModel = require("../../model/authModel/auth")
const topicModel = require("../../model/courseModel/topic")
const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

class CourseController {
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

    async createCourse(req, res) {
        try {

            const { title, description, language, learingOutcome, requirement, topicID } = req.body

            if (!title || !description || !language || !learingOutcome || !requirement || !topicID) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingTitle = await courseModel.findOne({ title })

            if (existingTitle) {
                return res.status(400).send(failure("Course title already exists. Please choose a different title."))
            }

            const existingteacher = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })
                .select("role isVerified isBanned")

            if (!existingteacher) {
                return res.status(400).send(failure("teacher not found"))
            }

            const existingTopic = await topicModel.findOne({ _id: new mongoose.Types.ObjectId(topicID) })
            if(!existingTopic || existingTopic.isDeleted === true){ 
                return res.status(400).send(failure("Topic not found"))
            }

            const course = new courseModel({
                title,
                description,
                teacherID: req.user._id,
                language,
                learingOutcome,
                requirement,
                topicID
            })

            if(existingteacher.role === "admin") {
                course.isApproved = true
                course.isPublished = true
            }

            await course.save()

            const response = course.toObject()
            delete response.__v
            delete response.isDeleted

            return res.status(200).send(success("Course created successfully", response))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get all courses
    async getCourses(req, res) {
        try {
            const courses = await courseModel.find({ isApproved: true, isDeleted: false })
            return res.status(200).send(success("All courses", courses))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete a course
    async deleteCourse(req, res) {
        try {
            const { courseID } = req.body

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })
            if (!existingCourse) {
                return res.status(400).send(failure("This course does not exist. Please enter a valid course."))
            }

            // soft delete
            existingCourse.isDeleted = true
            existingCourse.lessonID = [];
            await existingCourse.save()

            return res.status(200).send(success("Course deleted successfully"))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CourseController()