// import mongoose
const mongoose = require ('mongoose');

// create a schema
const likeSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'POST',
        required: true
    },
    user : {
        type : String,
        required: true
    },
})

// export the model
module.exports = mongoose.model("Like", likeSchema);
