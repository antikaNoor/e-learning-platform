const courseModel = require("../../model/courseModel/course")
const lessonModel = require("../../model/courseModel/lesson")
const teacherModel = require("../../model/authModel/teacher")
const studentModel = require("../../model/authModel/student")
const progressModel = require("../../model/courseModel/progress")
const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const { uploadFile, deleteFile, deleteFiles, deleteFolder } = require("../../config/files")
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
            const { title, description } = req.body
            console.log(courseID, title, description)

            if (!courseID || !title || !description) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
            }

            const existingTitle = await lessonModel.findOne({ title, courseID })
            if (existingTitle && existingTitle.isDeleted === false) {
                return res.status(400).send(failure("Lesson title already exists. Please choose a different title."))
            }

            const lesson = await lessonModel.create({
                title,
                description,
                courseID,
            });

            await lesson.save();

            const responseLesson = lesson.toObject();

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

    // add videos to a lesson
    async addVideos(req, res) {
        try {
            const { lessonID } = req.params
            const videoLink = req.file
            const { videoTitle } = req.body

            if (!lessonID || !videoLink || !videoTitle) {
                return res.status(400).send(failure("Please enter the lesson and video."))
            }

            const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID), isDeleted: false })

            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            const teacher = await teacherModel.findOne({ email: req.user.email })

            if (!teacher) {
                return res.status(400).send(failure("User not found"))
            }

            // check if teacher teacher this course
            // const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            // if (!authorizedCourses.includes(existingLesson.courseID.toString())) {
            //     return res.status(400).send(failure("You are not authorized to add videos to this lesson."));
            // }

            // push the video inside the videos array
            const uploadRes = await uploadFile(videoLink, "videos")

            if (!uploadRes) {
                return res.status(400).send(failure("Error uploading video."))
            }

            // push the title and link to videos
            existingLesson.videos.push({
                videoTitle: videoTitle,
                videoLink: uploadRes
            })
            await existingLesson.save()

            const responseLesson = existingLesson.toObject()

            return res.status(200).send(success("Video added successfully.", responseLesson))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // add notes to a lesson
    async addNotes(req, res) {
        try {
            const { lessonID } = req.params
            const noteLink = req.file
            const { noteTitle } = req.body

            if (!lessonID || !noteLink || !noteTitle) {
                return res.status(400).send(failure("Please enter the lesson and a note."))
            }

            const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID), isDeleted: false })

            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            const teacher = await teacherModel.findOne({ email: req.user.email })

            if (!teacher) {
                return res.status(400).send(failure("User not found"))
            }

            // check if teacher teacher this course
            // const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            // if (!authorizedCourses.includes(existingLesson.courseID.toString())) {
            //     return res.status(400).send(failure("You are not authorized to add videos to this lesson."));
            // }

            // push the video inside the videos array
            const uploadRes = await uploadFile(noteLink, "notes")

            if (!uploadRes) {
                return res.status(400).send(failure("Error uploading note."))
            }

            // push the title and link to notes
            existingLesson.notes.push({
                noteTitle: noteTitle,
                noteLink: uploadRes
            })
            await existingLesson.save()

            const responseLesson = existingLesson.toObject()

            return res.status(200).send(success("Note added successfully.", responseLesson))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // complete a lesson
    async completeLesson(req, res) {
        try {
            const { lessonID } = req.params

            if (!lessonID) {
                return res.status(400).send(failure("Please enter the lesson."))
            }

            const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID) })

            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            const existingStudent = await studentModel.findOne({ email: req.user.email })

            if (!existingStudent) {
                return res.status(400).send(failure("User not found"))
            }

            const course = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingLesson.courseID) })

            if (!course) {
                return res.status(400).send(failure("Course not found"))
            }

            // check if student is enrolled in this course
            const authorizedCourses = existingStudent.enrolledCourses.map(courseId => courseId.toString());

            if (!authorizedCourses.includes(existingLesson.courseID.toString())) {
                return res.status(400).send(failure("You are not authorized to complete this lesson."))
            }

            // existingStudent.completedLessons.push(existingLesson._id)
            // await existingStudent.save()

            const existingProgress = await progressModel.findOne({ studentID: new mongoose.Types.ObjectId(req.user._id) })

            if (!existingProgress) {
                return res.status(400).send(failure("Progress not found"))
            }

            // if lesson is found in the completedLessons array, return
            if (existingProgress.completedLessons.includes(existingLesson._id)) {
                return res.status(400).send(failure("Lesson already completed"))
            }

            // get the array length of completed lessonID in student model
            existingProgress.completedLessons.push(existingLesson._id)
            const completedLessons = existingProgress.completedLessons.length
            await existingProgress.save()

            // get the length of lessonID in course model
            const totalLessons = course.lessonID.length

            //compute progress (2 for quiz and assignment)
            const progress = (completedLessons / (totalLessons)) * 100

            existingProgress.percentage = progress
            await existingProgress.save()

            return res.status(200).send(success("Lesson completed successfully."))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete a video
    // async deleteVideo(req, res) {
    //     try {
    //         const { lessonID } = req.params
    //         const { videoURL } = req.body

    //         if (!lessonID || !videoURL) {

    //             return res.status(400).send(failure("Please enter the video url and lesson ID."))
    //         }

    //         const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID) })
    //         if (!existingLesson) {
    //             return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
    //         }

    //         // search the url inside the videos array
    //         // const existingVideo = existingLesson.videos.filter(video => )

    //         // if (!existingVideo) {
    //         //     return res.status(400).send(failure("The specified video does not exist. Please enter a valid video."))
    //         // }

    //         // console.log(existingVideo)

    //         // delete associated video from bucket
    //     } catch (error) {
    //         console.log("error", error)
    //         return res.status(500).send(failure("Internal server error"))
    //     }

    // }

    // delete a lesson
    async deleteLesson(req, res) {
        try {
            const { lessonID } = req.params

            if (!lessonID) {
                return res.status(400).send(failure("Please enter the lesson and course ID."))
            }

            const existingLesson = await lessonModel.findOne({ _id: new mongoose.Types.ObjectId(lessonID) })
            if (!existingLesson) {
                return res.status(400).send(failure("The specified lesson does not exist. Please enter a valid lesson."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingLesson.courseID) })
            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
            }

            if (existingLesson && existingLesson.isDeleted === true) {
                return res.status(400).send(failure("Lesson already deleted."))
            }

            existingCourse.lessonID = existingCourse.lessonID.filter(id => id.toString() !== lessonID);
            await existingCourse.save();

            // delete associated videos and notes from bucket
            await deleteFiles(existingLesson.videos);
            await deleteFiles(existingLesson.notes);

            existingLesson.isDeleted = true;
            existingLesson.videos = [];
            existingLesson.notes = [];

            await existingLesson.save();

            return res.status(200).send(success("Lesson deleted successfully."))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new LessonController()