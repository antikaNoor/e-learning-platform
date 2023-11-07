const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
    isApproved: {
        type: Boolean,
        default: false
    },
    approvalDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
