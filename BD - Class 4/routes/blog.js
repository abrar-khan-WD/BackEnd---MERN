const express = require('express');
const router = express.Router();

const {likePost } = require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');
const {createPost} = require('../controllers/postController');
const {getAllPosts} = require('../controllers/postController');
const {unlikePost} = require('../controllers/likeController');

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);


// Export the router
module.exports = router;
