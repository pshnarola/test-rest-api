const { check } = require('express-validator');

module.exports = {
    insertPost: [
        check('content')
            .trim()
            .not().isEmpty().withMessage('Post content is required')
            .exists().withMessage('Post content is required')
            .isLength({ min: 2 }).withMessage('Post content minimum 2 characters required.'),
    ],
    insertRating: [
        check('postId')
            .trim()
            .not().isEmpty().withMessage('PostId is required')
            .exists().withMessage('PostId is required'),
        check('userId')
            .trim()
            .not().isEmpty().withMessage('UserId is required')
            .exists().withMessage('UserId is required'),
        check('rating')
            .trim()
            .not().isEmpty().withMessage('Rating is required')
            .exists().withMessage('Rating is required')
            .isInt().withMessage('Pass numberical rating')
    ],
};
