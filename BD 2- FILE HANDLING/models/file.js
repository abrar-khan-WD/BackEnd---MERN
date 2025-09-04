// Import Mongoose
const mongoose = require('mongoose');

// Create Schem

const fileSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    tags : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
       required: true
    },
})

const File = mongoose.model('file', fileSchema);
module.exports = File;
