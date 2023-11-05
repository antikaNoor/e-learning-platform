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

            const { title, description, teacherID, language, learingOutcome, requirement, topicID } = req.body

            if (!title || !description || !teacherID || !language || !learingOutcome || !requirement || !topicID) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingTitle = await courseModel.findOne({ title })

            if (existingTitle) {
                return res.status(400).send(failure("Course title already exists. Please choose a different title."))
            }

            const existingteacher = await authModel.findOne({ _id: new mongoose.Types.ObjectId(teacherID) })
                .select("role isVerified isBanned")

            if (!existingteacher) {
                return res.status(400).send(failure("teacher not found"))
            }

            if (existingteacher.role !== "teacher") {
                return res.status(400).send(failure("User is not an teacher"))
            }

            if (!existingteacher.isVerified || existingteacher.isBanned) {
                return res.status(400).send(failure("teacher not verified or banned"))
            }

            const existingTopic = await topicModel.findOne({ _id: new mongoose.Types.ObjectId(topicID) })
            if(!existingTopic || existingTopic.isDeleted === true){ 
                return res.status(400).send(failure("Topic not found"))
            }

            const course = new courseModel({
                title,
                description,
                teacherID,
                language,
                learingOutcome,
                requirement,
                topicID
            })
            await course.save()
            return res.status(200).send(success("Course created successfully"))
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

    // publish a course 
    async publishCourse(req, res) {
        try {
            const { courseID } = req.body

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })
            if (!existingCourse) {
                return res.status(400).send(failure("This course does not exist. Please enter a valid course."))
            }

            // now admin can review the course for approval
            existingCourse.isPublished = true
            await existingCourse.save()

            return res.status(200).send(success("Course published successfully"))
        } catch(error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CourseController()