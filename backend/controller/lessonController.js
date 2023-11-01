const courseModel = require("../model/courseModel/course")
const lessonModel = require("../model/courseModel/lesson")
const { success, failure } = require("../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
// const fileTypes = require("../constants/fileTypes")
const fs = require('fs')
const path = require('path')

class LessonController {
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

    async createLesson(req, res) {
        try {

            const { title, description, accessibleToUnenrolled, courseReference } = req.body

            if (!title || !description || !accessibleToUnenrolled) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            let existingCourse = null;

            if (courseReference) {
                existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseReference) });

                if (!existingCourse || existingCourse.isDeleted === true) {
                    return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
                }
            }

            const existingTitle = await lessonModel.findOne({ title })
            if (existingTitle) {
                return res.status(400).send(failure("Lesson title already exists. Please choose a different title."))
            }

            const lesson = await lessonModel.create({
                title, description, accessibleToUnenrolled, courseReference
            });

            await lesson.save();

            const responseLesson = lesson.toObject();

            if (existingCourse) {
                existingCourse.courseContent.push(new mongoose.Types.ObjectId(responseLesson._id))
                await existingCourse.save()
            }

            return res.status(200).send(success("Lesson created successfully.", responseLesson));
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete a lesson
    async deleteLesson(req, res) {
        try {
            const { lessonID } = req.body

            if (!lessonID) {
                return res.status(400).send(failure("Please enter the lesson's ID."))
            }

            let existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID) })
            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            if (existingLesson.courseReference !== null) {
                const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingLesson.courseReference) })

                if (!existingCourse || existingCourse.isDeleted === true) {
                    return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
                }

                existingCourse.courseContent = existingCourse.courseContent.filter(id => id.toString() !== lessonID);
                await existingCourse.save();
            }

            await lessonModel.deleteOne({ _id: lessonID });

            return res.status(200).send(success("Lesson deleted successfully."))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new LessonController()