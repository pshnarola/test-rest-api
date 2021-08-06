let mongoose = require('mongoose');
let postSchema = new mongoose.Schema(
    {
        content: { type: String, required: true }
    },
    {
        timestamps: true
    });

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;