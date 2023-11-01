const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Auth", // Reference to the authentication schema
        required: true,
        unique: true
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
    certification: {
        type: String,
        default: null
    },
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
