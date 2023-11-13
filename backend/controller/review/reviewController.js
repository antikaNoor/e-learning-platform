const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const courseModel = require("../../model/courseModel/course")
const reviewModel = require("../../model/reviewModel/review")

const { success, failure } = require("../../utils/successError")
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

class reviewClass {

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

    async addReview(req, res) {
        try {
            const { courseID } = req.params;
            const { rating, text } = req.body;

            if (!courseID || !rating) {
                return res.status(400).send(failure("Please enter a valid course id and rating."));
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."));
            }

            // check if student is enrolled in the course
            const student = await studentModel.findOne({ email: req.user.email });

            if (!student) {
                return res.status(400).send(failure("Student not found."));
            }

            //check if student has completed the course
            // if (!student.completedCourses.includes(courseID)) {
            //     return res.status(400).send(failure("Student has not completed the course."));
            // }

            // check if student has already given the review
            const existingReview = await reviewModel.findOne({ courseID, userID: req.user._id });

            if (existingReview) {
                return res.status(400).send(failure("You have already given a review for this course. You can edit it."));
            }

            const review = new reviewModel({
                courseID,
                userID: req.user._id,
                rating,
                text: text || null,
            });

            await review.save();

            // Update the course's review array
            existingCourse.reviews.push(review._id);
            await existingCourse.save();

            // Update the course's review array and calculate the new average rating
            const averageReview = await reviewModel.aggregate([
                {
                    $match: {
                        courseID: new mongoose.Types.ObjectId(courseID),
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" },
                    },
                },
            ]);

            // Update the course model with the new average rating
            if (averageReview.length > 0) {
                const newAverageRating = averageReview[0].averageRating;

                await courseModel.updateOne(
                    { _id: new mongoose.Types.ObjectId(courseID) },
                    { $set: { rating: newAverageRating } }
                );

                const response = review.toObject();
                delete response.__v;
                delete response.updatedAt;
                delete response.createdAt;

                return res.status(200).send(success("Review added successfully.", response, { newAverageRating }));
            }

            // If there are no reviews, set the course rating to 0
            await courseModel.updateOne(
                { _id: new mongoose.Types.ObjectId(courseID) },
                { $set: { rating: 0 } }
            );

            const response = review.toObject();
            delete response.__v;
            delete response.updatedAt;
            delete response.createdAt;

            return res.status(200).send(success("Review added successfully.", response, { newAverageRating: 0 }));

        } catch (error) {
            console.error("Error while entering review:", error);
            return res.status(500).send(failure("Internal server error."));
        }
    }


    // edit a review
    async editReview(req, res) {
        try {
            const { reviewID } = req.params;
            const { rating, text } = req.body;

            if (!rating) {
                return res.status(400).send(failure("Please enter a valid rating."));
            }

            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."));
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) });

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."));
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) });

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to edit this review."));
            }

            // Update the review with the new rating and text
            existingReview.rating = rating;
            existingReview.text = text || null;
            await existingReview.save();

            // Update the course's review array and calculate the new average rating
            const averageReview = await reviewModel.aggregate([
                {
                    $match: {
                        courseID: new mongoose.Types.ObjectId(existingReview.courseID),
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" },
                    },
                },
            ]);

            // Update the course model with the new average rating
            if (averageReview.length > 0) {
                const newAverageRating = averageReview[0].averageRating;

                await courseModel.updateOne(
                    { _id: new mongoose.Types.ObjectId(existingReview.courseID) },
                    { $set: { rating: newAverageRating } }
                );

                const editedReview = {
                    rating: existingReview.rating,
                    text: existingReview.text,
                };

                return res.status(200).send(success("Review edited successfully.", editedReview, { newAverageRating }));
            }

            // If there are no reviews, set the course rating to 0
            await courseModel.updateOne(
                { _id: new mongoose.Types.ObjectId(existingReview.courseID) },
                { $set: { rating: 0 } }
            );

            const editedReview = {
                rating: existingReview.rating,
                text: existingReview.text,
            };

            return res.status(200).send(success("Review edited successfully.", editedReview, { newAverageRating: 0 }));

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error."));
        }
    }

    // delete review and rating
    async deleteReview(req, res) {
        try {
            const { reviewID } = req.params;

            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."));
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) });

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."));
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) });

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to delete this review."));
            }

            await reviewModel.deleteOne({ _id: new mongoose.Types.ObjectId(reviewID) });

            // Update the course's review array
            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingReview.courseID) });

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."));
            }

            existingCourse.reviews = existingCourse.reviews.filter(review => review.toString() !== reviewID);

            await existingCourse.save();

            // Update the course's review array and calculate the new average rating
            const averageReview = await reviewModel.aggregate([
                {
                    $match: {
                        courseID: new mongoose.Types.ObjectId(existingReview.courseID),
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" },
                    },
                },
            ]);

            // Update the course model with the new average rating
            if (averageReview.length > 0) {
                const newAverageRating = averageReview[0].averageRating;

                await courseModel.updateOne(
                    { _id: new mongoose.Types.ObjectId(existingReview.courseID) },
                    { $set: { rating: newAverageRating } }
                );

                return res.status(200).send(success("Review deleted successfully.", { newAverageRating }));
            }

            // If there are no reviews, set the course rating to 0
            await courseModel.updateOne(
                { _id: new mongoose.Types.ObjectId(existingReview.courseID) },
                { $set: { rating: 0 } }
            );

            return res.status(200).send(success("Review deleted successfully.", { newAverageRating: 0 }));

        } catch (error) {
            console.error("Error while deleting review:", error);
            return res.status(500).send(failure("Internal server error."));
        }
    }

    // delete review text but keep the rating
    async deleteReviewText(req, res) {
        try {
            const { reviewID } = req.params
            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to delete this review."))
            }

            if (existingReview.text === null) {
                return res.status(400).send(failure("Review text is already deleted."))
            }

            existingReview.text = null
            await existingReview.save()

            return res.status(200).send(success("Review text deleted successfully."))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // get aggregates review for a course
    async getAggregatesReview(req, res) {
        try {
            const { courseID } = req.params;

            if (!courseID) {
                return res.status(400).send(failure("Please enter a valid course id."));
            }

            // Check if the course exists
            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."));
            }

            // Use MongoDB aggregation to calculate the average review rating for the given course
            const averageReview = await reviewModel.aggregate([
                {
                    $match: {
                        courseID: new mongoose.Types.ObjectId(courseID)
                    }
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" }
                    }
                }
            ]);

            if (averageReview.length === 0) {
                return res.status(404).send(failure("No reviews found for the specified course."));
            }

            const response = {
                averageRating: averageReview[0].averageRating
            };

            return res.status(200).send(success("Average review calculated successfully.", response));
        } catch (error) {
            console.error("Error while calculating average review:", error);
            return res.status(500).send(failure("Internal server error."));
        }
    }


    // get all the reviews for a course
    async getAllReviews(req, res) {
        try {
            const { courseID } = req.params
            if (!courseID) {
                return res.status(400).send(failure("Please enter a valid course id."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."))
            }

            const reviews = await reviewModel.find({ courseID: new mongoose.Types.ObjectId(courseID) })
                .select("-__v -createdAt -updatedAt")

            return res.status(200).send(success("Reviews fetched successfully.", reviews))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // get a your review for a course
    async getYourReview(req, res) {
        try {
            const { courseID } = req.params
            if (!courseID) {
                return res.status(400).send(failure("Please enter a valid course id."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            const review = await reviewModel.findOne({ courseID: new mongoose.Types.ObjectId(courseID), userID: new mongoose.Types.ObjectId(student._id) })
                .select("-__v -createdAt -updatedAt")

            if (!review) {
                return res.status(400).send(failure("Review not found."))
            }

            return res.status(200).send(success("Review fetched successfully.", review))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // like a review
    async likeReview(req, res) {
        try {
            const { reviewID } = req.params
            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const user = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (user.role === "admin") {
                return res.status(400).send(failure("You are not authorized to like this review."))
            }

            if (user._id.toString() === existingReview.userID.toString()) {
                return res.status(400).send(failure("You cannot like your own review."))
            }

            if (existingReview.dislikes.includes(user._id)) {
                // remove the like and pull the user id from array
                existingReview.dislikes.pull(user._id)
                existingReview.likes.push(user._id)
                await existingReview.save()

                return res.status(200).send(success("Liked successfully."))
            }

            if (existingReview.likes.includes(user._id)) {
                // remove the like and pull the user id from array
                existingReview.likes.pull(user._id)
                await existingReview.save()

                return res.status(200).send(success("Like removed successfully."))
            }

            existingReview.likes.push(user._id)

            await existingReview.save()

            return res.status(200).send(success("Review liked successfully."))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // dislike a review
    async dislikeReview(req, res) {
        try {
            const { reviewID } = req.params
            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const user = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (user.role === "admin") {
                return res.status(400).send(failure("You are not authorized to dislike this review."))
            }

            if (user._id.toString() === existingReview.userID.toString()) {
                return res.status(400).send(failure("You cannot dislike your own review."))
            }

            if (existingReview.likes.includes(user._id)) {
                // remove the like and pull the user id from array
                existingReview.likes.pull(user._id)
                existingReview.dislikes.push(user._id)
                await existingReview.save()

                return res.status(200).send(success("Disliked successfully."))
            }

            if (existingReview.dislikes.includes(user._id)) {
                // remove the like and pull the user id from array
                existingReview.dislikes.pull(user._id)
                await existingReview.save()

                return res.status(200).send(success("Dislike removed successfully."))
            }

            existingReview.dislikes.push(user._id)

            await existingReview.save()

            return res.status(200).send(success("Review disliked successfully."))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    async updateCourseRating(courseID) {
        // Calculate the new average rating for the course
        const averageReview = await reviewModel.aggregate([
            {
                $match: {
                    courseID: new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        // Update the course model with the new average rating
        if (averageReview.length > 0) {
            const newAverageRating = averageReview[0].averageRating;

            await courseModel.updateOne(
                { _id: new mongoose.Types.ObjectId(courseID) },
                { $set: { rating: newAverageRating } }
            );

            return newAverageRating;
        }

        // If there are no reviews, set the course rating to 0
        await courseModel.updateOne(
            { _id: new mongoose.Types.ObjectId(courseID) },
            { $set: { rating: 0 } }
        );

        return 0;
    }
}

module.exports = new reviewClass()