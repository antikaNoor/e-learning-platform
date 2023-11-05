const jwt = require("jsonwebtoken")
const { success, failure } = require("../utils/successError")

const authModel = require('../model/authModel/auth')

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
            return res.status(400).send(failure("Are you a student?"))
        }

        if (user.role !== "student") {
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
            return res.status(400).send(failure("Are you a teacher?"))
        }

        if (user.role !== "teacher") {
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

const isUserVerified = async (req, res, next) => {
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

        if (!user.isVerified) {
            return res.status(400).send(failure("User is not verified"))
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

module.exports = {
    isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified
}