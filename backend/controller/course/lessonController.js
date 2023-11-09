const courseModel = require("../../model/courseModel/course")
const lessonModel = require("../../model/courseModel/lesson")
const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const { uploadFile, deleteFile, deleteFolder } = require("../../config/files")
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

    // create a lesson
    async createLesson(req, res) {
        try {
            const file = req.file
            const { title, description, isAccessibleToUnenrolled, courseID, folderName } = req.body

            if (!title || !description || !isAccessibleToUnenrolled || !courseID || !file || !folderName) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
            }

            const existingTitle = await lessonModel.findOne({ title })
            if (existingTitle && existingTitle.isDeleted === false) {
                return res.status(400).send(failure("Lesson title already exists. Please choose a different title."))
            }

            const uploadRes = await uploadFile(file, folderName)

            const lesson = await lessonModel.create({
                title,
                description,
                isAccessibleToUnenrolled,
                courseID,
                videoFilePath: uploadRes,
            });

            await lesson.save();

            const responseLesson = lesson.toObject();

            delete responseLesson.isAccessibleToUnenrolled;
            delete responseLesson.isDeleted;

            if (existingCourse) {
                existingCourse.lessonID.push(new mongoose.Types.ObjectId(responseLesson._id))
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
            const { lessonID, courseID } = req.body

            if (!lessonID || !courseID) {
                return res.status(400).send(failure("Please enter the lesson and course ID."))
            }

            const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID) })
            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })
            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
            }

            if (existingLesson && existingLesson.isDeleted === true) {
                return res.status(400).send(failure("Lesson already deleted."))
            }

            existingCourse.lessonID = existingCourse.lessonID.filter(id => id.toString() !== lessonID);
            await existingCourse.save();

            // delete associated video from bucket
            await deleteFile(existingLesson.videoFilePath)

            existingLesson.isDeleted = true;
            existingLesson.videoFilePath = null;
            await existingLesson.save();

            return res.status(200).send(success("Lesson deleted successfully."))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new LessonController()