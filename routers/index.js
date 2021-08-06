const router = require("express").Router();
const postRouter = require('./post.router');

router.use('/post', postRouter);

module.exports = router;