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
            // const video = req.file
            const { courseID } = req.params
            const { title, description, isAccessibleToUnenrolled } = req.body
            console.log(title, description, isAccessibleToUnenrolled)

            if (!title || !description || !isAccessibleToUnenrolled) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            // Check if files are uploaded
            if (!req.files || req.files.length === 0) {
                return res.status(400).send(failure("Please upload at least one video and one note."));
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
            }

            const existingTitle = await lessonModel.findOne({ title })
            if (existingTitle && existingTitle.isDeleted === false) {
                return res.status(400).send(failure("Lesson title already exists. Please choose a different title."))
            }

            const videos = req.files.map(video => ({ filePath: video.buffer.toString('base64') }));
            const notes = req.files.map(note => ({ filePath: note.buffer.toString('base64') }));

            const videoUrls = await Promise.all(req.files.map(async (video) => {
                try {
                    return await uploadFile(video, 'videos'); // Assuming 'videos' is the folder for videos
                } catch (uploadError) {
                    console.error("Error uploading video:", uploadError.message);
                    throw uploadError;
                }
            }));

            const noteUrls = await Promise.all(req.files.map(async (note) => {
                try {
                    return await uploadFile(note, 'notes'); // Assuming 'notes' is the folder for notes
                } catch (uploadError) {
                    console.error("Error uploading note:", uploadError.message);
                    throw uploadError;
                }
            }));

            const lesson = await lessonModel.create({
                title,
                description,
                isAccessibleToUnenrolled,
                courseID,
                videos: videoUrls.map(filePath => ({ filePath })),
                notes: noteUrls.map(filePath => ({ filePath })),
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