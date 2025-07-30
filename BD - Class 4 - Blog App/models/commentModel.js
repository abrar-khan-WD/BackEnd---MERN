// IMPORT MONGOOSE
const mongoose = require('mongoose');

// CREATE A COMMENT SCHEMA
const commentSchema = new mongoose.Schema({
    post : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POST',
    }],
    user : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    }

})

// EXPORT THE COMMENT MODEL
module.exports = mongoose.model("comment", commentSchema);
