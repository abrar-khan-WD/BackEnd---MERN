// Import Models
const commentModel = require('../models/commentModels');
const postModel = require('../models/postModels');

// Business Logic for Comments
exports.createComment = async (req, res) => {
    try{
        // fetch data from request body
        const {post, user, body} = req.body;
        // create a comment object
        const comment = new commentModel({
            post,
            user,
            content: body
        });
        
        // save the comment to the database
        const savedComment = await comment.save();

        // find the post by ID and update its comments array
       const updatedPost = await postModel.findByIdAndUpdate(post, {
           $push: { comments: savedComment._id }
       }, {new:true})
       .populate('comments') // populate comments with their details
       .exec();

        // return the updated post with the new comment
        res.status(201).json({
            message: "Comment created successfully",
            post: updatedPost
        })

    } 
    catch(err){
        console.error("Error creating comment:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}