const router = require("express").Router();
const { insertPost, udpatePost, deletePost } = require("../controllers/post.controller");
const { insertRating, retriveAveragePostRating } = require("../controllers/rating.controller");
const validation = require('../validation/post/post');
const handleValidationError = require('../validation/handleError');


router.post('/', validation.insertPost, handleValidationError, insertPost);
router.put('/:id', validation.insertPost, handleValidationError, udpatePost);
router.delete('/:id', deletePost);


router.post('/rate', validation.insertRating, handleValidationError, insertRating);
router.get('/average_rate/:id', retriveAveragePostRating);

module.exports = router;