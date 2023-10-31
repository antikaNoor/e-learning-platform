const courseModel = require("../model/course")
const authModel = require("../model/auth")
const { success, failure } = require("../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
// const fileTypes = require("../constants/fileTypes")
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

            const { title, description, instructorID, language, learingOutcome, requirement, isPremium } = req.body

            if (!title || !description || !instructorID || !language || !learingOutcome || !requirement || !isPremium) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingTitle = await courseModel.findOne({ title })

            if (existingTitle) {
                return res.status(400).send(failure("Course title already exists. Please choose a different title."))
            }

            const existingInstructor = await authModel.findOne({ _id: new mongoose.Types.ObjectId(instructorID) })
                .select("role isVerified isBanned")

            if (!existingInstructor) {
                return res.status(400).send(failure("Instructor not found"))
            }

            if (existingInstructor.role !== "instructor") {
                return res.status(400).send(failure("User is not an instructor"))
            }

            if (!existingInstructor.isVerified || existingInstructor.isBanned) {
                return res.status(400).send(failure("Instructor not verified or banned"))
            }

            const course = new courseModel({
                title,
                description,
                instructorID,
                language,
                learingOutcome,
                requirement,
                isPremium
            })
            await course.save()
            return res.status(200).send(success("Course created successfully"))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete a course
    async deleteCourse(req, res) {
        try {
            const { courseID } = req.body

            const existingCourse = await courseModel.findOne({_id: new mongoose.Types.ObjectId(courseID)})
            if(!existingCourse) {
                return res.status(400).send(failure("This course does not exist. Please enter a valid course."))
            }

            existingCourse.isDeleted = true
            existingCourse.courseContent = [];
            await existingCourse.save()

            return res.status(200).send(success("Course deleted successfully"))
            
        } catch(error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CourseController()