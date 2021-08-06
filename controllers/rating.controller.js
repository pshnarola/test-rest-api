const PostRatingModel = require("../models/postRating.model");
const constants = require('../config/constant');
const PostModel = require("../models/post.model");
const ObjectId = require('mongodb').ObjectId;


/**
 * Add Rating
 * @param {Object} string Post id, User id and rating.
 * @return {Object} responseObject with message and error(if getting error).
 */
exports.insertRating = async (req, res) => {
    try {
        const ratingData = req.body;
        const findPostData = await PostModel.findById(ratingData.postId);
        if (!findPostData) {
            res.status(constants.NOT_FOUND).json({ message: "Post not found." });
        } else {
            const findPostRatingUserData = await PostRatingModel.findOne({ userId: ratingData.userId, postId: ratingData.postId });
            if (findPostRatingUserData) {
                res.status(constants.NOT_FOUND).json({ message: "User already added rating." });
            } else {
                const postRatingSchema = await new PostRatingModel(ratingData);
                postRatingSchema.save()
                    .then(addedPostRating => {
                        res.status(constants.OK_STATUS).json({ message: "Rating added successfully." });
                    })
                    .catch(err => {
                        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: err });
                    })
            }
        }
    } catch (error) {
        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
    }
}


/**
 * Get average Rate
 * @param {String} string Post id which need to get average rating
 * @return {Object} responseObject with message and error(if getting error).
 */
exports.retriveAveragePostRating = async (req, res) => {
    try {
        let aggregate = [
            {
                $match: {
                    _id: new ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "postratings",
                    localField: "_id",
                    foreignField: "postId",
                    as: "ratingList"
                }
            },
            {
                $unwind: "$ratingList"
            },
            {
                $group: {
                    _id: "$_id",
                    postContent: { $first: "$content" },
                    average: { $avg: '$ratingList.rating' }
                }
            }
        ];
        await PostModel.aggregate(aggregate)
            .then(async averagePost => {
                res.status(constants.OK_STATUS).json({ message: "Average rate get sucessfully.", data: (averagePost.length > 0) ? averagePost[0] : [] })
            }).catch(error => {
                res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
            });
    } catch (error) {
        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
    }
}
