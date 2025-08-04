// Import Models
const Like = require("../models/likeModels");
const Post = require("../models/postModels");

// Business Logic for likes
exports.likePost = async (req, res) => {
    try {
        // fetch data from request body
        const { post, user } = req.body;

        // Create a Like object
        const newLike = new Like({
            post,
            user
        });

        // SAVE the like to database
        const savedLike = await newLike.save();

        // Find the post by ID and update its likes array
        let updatedPost = await Post.findByIdAndUpdate(
            post,
            {
                $push: { likes: savedLike._id }
            },
            { new: true }
        ).populate('likes').exec();

        // Return the updated post with the new like
        res.status(201).json({
            message: "Like created successfully",
            post: updatedPost
        });

    } catch (error) {
        console.error("Error creating like:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Unlike a Post
exports.unlikePost = async (req, res) => {
    try{
        // fetch data from request body
        const {post, like} = req.body;

        // Find and delete the like document
        const deletedLike = await Like.findOneAndDelete({
            post: post,
            _id: like
        });

        // Update the post to remove the like from its likes array
        const updatedPost = await Post.findByIdAndUpdate(post,{
            $pull: {likes: like}
        }, {new: true}).populate('likes').exec();

        // Return the updated post
        res.status(200).json({
            message: "Like removed successfully",
            post: updatedPost
        });
    } catch(error) {
        console.error("Error unliking post:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}