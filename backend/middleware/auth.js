const jwt = require("jsonwebtoken")
const { success, failure } = require("../utils/successError")

const authModel = require('../model/authModel/auth')
const teacherModel = require("../model/authModel/teacher")

const isUserLoggedIn = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(400).send(failure("Authorization failed!"))
        }
        const token = req.headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        const user = await authModel.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(400).send(failure("User not found"))
        }

        req.user = user
        next()

    } catch (error) {
        console.log("error found", error)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).send(failure("Token is invalid", error))
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).send(failure("Token is expired", error))
        }
        return res.status(500).send(failure("Internal server error"))
    }
}

const isUserAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).send(failure("Authorization failed!"))
        }
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        const user = await authModel.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(400).send(failure("User not found"))
        }

        if (user.role !== "admin") {
            return res.status(400).send(failure("Authorization failed!"))
        }

        req.user = user
        next()

    } catch (error) {
        console.log("error found", error)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).send(failure("Token is invalid", error))
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).send(failure("Token is expired", error))
        }
        return res.status(500).send(failure("Internal server error"))
    }
}

const isUserStudent = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).send(failure("Authorization failed!"))
        }
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        const user = await authModel.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(400).send(failure("User not found"))
        }

        if (user.role !== "student" || user.isBanned || !user.isVerified) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        req.user = user
        next()

    } catch (error) {
        console.log("error found", error)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).send(failure("Token is invalid", error))
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).send(failure("Token is expired", error))
        }
        return res.status(500).send(failure("Internal server error"))
    }
}

const isUserTeacher = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).send(failure("Authorization failed!"))
        }
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        const user = await authModel.findOne({ _id: decoded._id })

        if (!user) {
            return res.status(400).send(failure("User not found"))
        }

        if (user.role !== "teacher" || user.isBanned || !user.isVerified) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        const teacher = await teacherModel.findOne({ email: user.email })

        if (!teacher || !teacher.isApproved) {
            return res.status(400).send(failure("Authorization failed!"))
        }

        req.user = user
        next()

    } catch (error) {
        console.log("error found", error)
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).send(failure("Token is invalid", error))
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).send(failure("Token is expired", error))
        }
        return res.status(500).send(failure("Internal server error"))
    }
}

const isAdminOrTeacher = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).send(failure("Authorization failed!"));
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).send(failure("Authorization failed!"));
        }

        const user = await authModel.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(400).send(failure("User not found"));
        }

        // Use && instead of ||
        if (!(user.role === "teacher" || user.role === "admin" || user.isBanned || !user.isVerified)) {
            return res.status(400).send(failure("Authorization failed!"));
        }

        const teacher = await teacherModel.findOne({ email: user.email });

        if (user.role === "teacher" && (!teacher || !teacher.isApproved)) {
            return res.status(400).send(failure("Authorization failed!"));
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("error found", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(500).send(failure("Token is invalid", error));
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(500).send(failure("Token is expired", error));
        }
        return res.status(500).send(failure("Internal server error"));
    }
};

module.exports = {
    isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isAdminOrTeacher
}