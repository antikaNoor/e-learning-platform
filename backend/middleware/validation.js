const { body } = require("express-validator")

const authValidator = {
    signup: [
        body("username")
            .isString()
            .withMessage("Name must be a string.")
            .custom((value) => {
                if (value === "") {
                    throw new Error("Name cannot be empty")
                }
                return true
            }),
        body("email")
            .isString()
            .withMessage("email must be a string.")
            .bail()
            .isEmail()
            .withMessage("Please enter a valid email id"),

        body("password")
            .custom((value, { req }) => {
                if (value.length < 8) {
                    throw new Error("Password must be longer than 8 characters.")
                }
                const name = req.body.username.toLowerCase()
                if (value.toLowerCase().includes(name)) {
                    throw new Error("Password should be different from username.")
                }
                const checkCapitalLetter = /[A-Z]+/
                const checkNumber = /[0-9]+/
                const checkSpecialChar = /[*@!#%&()^~{}]+/

                if (!checkCapitalLetter.test(value) || !checkNumber.test(value) || !checkSpecialChar.test(value)) {
                    throw new Error("Passowrd must contain at least one special character, one Capital letter and one number.")
                }
                return true
            }),

        body("role")
            .isString()
            .withMessage("Role must be a string.")
            .custom((value) => {
                const validRoles = ["teacher", "student"];

                if (!validRoles.includes(value)) {
                    throw new Error("Invalid role. Allowed values are 'teacher' or 'student'.");
                }

                return true;
            }),
    ]
}

const categoryValidator = {
    addCategory: [
        body("categoryName")
            .isString()
            .withMessage("Category name must be a string.")
            .custom((value) => {
                if (value === "") {
                    throw new Error("Name cannot be empty");
                }
                return true;
            }),
    ]
}

const topicValidator = {
    addTopic: [
        body("topicName")
            .isString()
            .withMessage("Topic name must be a string.")
            .custom((value) => {
                if (value === "") {
                    throw new Error("Name cannot be empty");
                }
                return true;
            }),

        body("categoryID")
            .isMongoId()
            .withMessage("Category ID must be a valid MongoDB ID."),
    ]
}


const courseValidator = {
    addCourse: [
        body("title")
            .isString()
            .withMessage("Title must be a string.")
            .custom((value) => {
                if (value === "") {
                    throw new Error("Name cannot be empty");
                }
                return true;
            }),

        body("description")
            .isString()
            .withMessage("Description must be a string.")
            .custom((value) => {
                if (value === "") {
                    throw new Error("Description cannot be empty");
                }
                return true;
            }),

        body("language")
            .isString()
            .withMessage("Language must be a string.")
            .isIn(["English", "Bangla"])
            .withMessage("Language must be either 'English' or 'Bangla'."),

        body("requirement")
            .isArray()
            .withMessage("Requirement must be an array."),

        body("topicID")
            .isMongoId()
            .withMessage("Topic ID must be a valid MongoDB ID."),
    ]
};

const reviewValidator = {
    addReview: [
        body("rating")
            .isNumeric()
            .withMessage("Rating must be a number.")
            .custom((value) => {
                if (!Number.isInteger(Number(value))) {
                    throw new Error("Rating must be a whole number.");
                }

                if (value < 1 || value > 5) {
                    throw new Error("Rating must be between 1 and 5.");
                }

                return true;
            }),

        body("text")
            .optional()
            .isString()
            .withMessage("Text must be a string."),
    ]
};


module.exports = {
    authValidator,
    courseValidator,
    categoryValidator,
    topicValidator,
    reviewValidator
}
