const brcypt = require('bcrypt');
const User = require('../models/user');

// Sign Up Route Handler
exports.signup = async(req, res) => {
    try{
        // Extract user details from request body
        const {name, email, password, role} = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({
            email:email
        })
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the pasword
        let hashedPassword;
        try{
            hashedPassword = await brcypt.hash(password,10)
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Error hashing password"
            });
        }
        // Create a new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || 'user' // Default to 'user' if no role is provided
        })
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "User creation failed, Please try again",
            error: err.message
        });
    }
}