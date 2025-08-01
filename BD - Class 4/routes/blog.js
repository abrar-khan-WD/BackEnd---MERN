const express = require('express');
const router = express.Router();

const {likeController} = require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');
const {createPost} = require('../controllers/postController');
const {getAllPosts} = require('../controllers/postController');

router.get("/dummy", likeController);
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);

// Export the router
module.exports = router;
