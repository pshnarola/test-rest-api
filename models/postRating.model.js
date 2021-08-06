
let mongoose = require('mongoose');
let postRatingSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        rating: { type: Number },
    },
    {
        timestamps: true
    });

const PostRatingModel = mongoose.model('postRating', postRatingSchema);

module.exports = PostRatingModel;