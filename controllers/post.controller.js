const PostModel = require("../models/post.model");
const constants = require('../config/constant')

/**
 * Add Post
 * @param {Object} string post of the content under the object
 * @return {Object} responseObject with message and and error(if getting error).
 */
exports.insertPost = async (req, res) => {
    try {
        const post = req.body;
        const postSchema = await new PostModel(post);
        postSchema.save()
            .then(addedPOst => {
                res.status(constants.OK_STATUS).json({ message: "Post added successfully." });
            })
            .catch(error => {
                console.log("err: ", error)
                res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
            })
    } catch (error) {
        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
    }
}

/**
 * Update Post
 * @param {id} string post id which need to update
 * @param {Object} string post of the content
 * @return {Object} responseObject with message and data(fetched records array) or error.
 */
exports.udpatePost = async (req, res) => {
    try {
        const findPostData = await PostModel.findById(req.params.id);
        if (!findPostData) {
            res.status(constants.NOT_FOUND).json({ message: "Post not found." });
        } else {
            PostModel.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true })
                .then(updatedPost => {
                    res.status(constants.OK_STATUS).json({ message: "Post updated successfully." });
                })
                .catch(error => {
                    res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
                })
        }
    } catch (error) {
        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
    }
}

/**
 * Delete Post
 * @param {id} string post id which need to delete
 * @return {Object} responseObject with message and error(if getting error).
 */
exports.deletePost = async (req, res) => {
    try {
        const findPostData = await PostModel.findById(req.params.id);
        if (!findPostData) {
            res.status(constants.NOT_FOUND).json({ message: "Post not found." });
        } else {
            PostModel.findByIdAndDelete(req.params.id)
                .then(updatedPost => {
                    res.status(constants.OK_STATUS).json({ message: "Post deleted successfully." });
                })
                .catch(error => {
                    res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
                })
        }
    } catch (error) {
        res.status(constants.BAD_REQUEST).json({ message: "something want wrong", error: error });
    }
}