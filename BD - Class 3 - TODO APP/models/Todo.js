
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength:50
    },
    description : {
        type : String,
        required: true,
        maxLength: 50
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo; // ✅ IMPORTANT: Export the model itself