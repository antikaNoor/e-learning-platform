const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 50,
        unique: true,
        required: [true, "Username should be provided"]
    },
    email: {
        type: String,
        maxLength: 100,
        unique: true,
        required: [true, "Email should be provided"]
    },
    role: {
        type: String,
        required: true,
        default: "student"
    },
    // for students
    enrolledCourses: [{
        course: {
            type: mongoose.Types.ObjectId,
            ref: "Course"
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    }],
    completedCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    favouriteCourses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },

    //for teachers
    coursesTaught: {
        type: [mongoose.Types.ObjectId],
        ref: "Course"
    },
    educationalBackground: [{
        univesity: {
            type: String,
            default: null
        },
        major: {
            type: String,
        },
        cgpa: {
            type: Number,
        }
    }],
    teachingExperience: [{
        institution: {
            type: String,
            default: null
        },
        duration: {
            type: String,
        },
        description: {
            type: String
        }
    }],
    isTeacher: {
        type: Boolean,
        default: false
    },
    approvalDate: {
        type: Date,
        default: null
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;