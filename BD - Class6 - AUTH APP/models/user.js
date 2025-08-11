const mongoose = require('mongoose');

// Define the User Schema

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'student', 'admin'],
        default: 'user'
    }
})

// Export the User model
module.exports = mongoose.model('User', userSchema);