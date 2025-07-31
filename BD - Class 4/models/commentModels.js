// Import mongoose
const mongoose = require ("mongoose");

// Create a schema for comments

const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
    },
    user : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    }
})

// Export the comment model
module.exports = mongoose.model("Comment", commentSchema);
// This model can be used to create, read, update, and delete comments in the database