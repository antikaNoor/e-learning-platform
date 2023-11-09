const courseModel = require("../../model/courseModel/course")
const lessonModel = require("../../model/courseModel/lesson")
const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const teacherModel = require("../../model/authModel/teacher")
const assignmentModel = require("../../model/courseModel/quiz")
const evaluationModel = require("../../model/courseModel/evaluation")

const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const { uploadFile, deleteFile, deleteFolder } = require("../../config/files")
// const fileTypes = require("../constants/fileTypes")
const fs = require('fs')
const path = require('path')

class FileUploadController {

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

    // upload assignment documents
    async uploadAssignmentDocument(req, res) {

    }
}

module.exports = new FileUploadController()