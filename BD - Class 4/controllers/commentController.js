// Import Models
const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');

// Business Logic for Comments
exports.createComment = async (req, res) => {
    try{
        // fetch data from request body
        const {post, user, body} = req.body;
        // create a comment object
        
        // save the comment to the database
        const savedComment = await comment.save();

        // find the post by ID and update its comments array

    } 
    catch(err){
        res.status(500).json({message: err.message});
    }
}