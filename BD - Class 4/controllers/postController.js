// Import Dependencies 
const Post = require('../models/postModels');

// Business Logic for Posts
exports.createPost = async (req, res) => {
    try{
        // fetch data from request body
        const {title, body} = req.body;
        // create a post object
        const post = new Post({
            title,
            body
        })
        // save the post to the database
        const savedPost = await post.save();

        res.status(201).json({
            message: "Post created successfully",
            post: savedPost
        });
    }

    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get All Posts
exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('comments').exec();
        res.status(200).json({
            success: true,
            posts: posts
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}