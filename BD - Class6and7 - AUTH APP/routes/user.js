const express = require('express');
const router = express.Router();
const User = require('../models/user');

const {login, signup} = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require('../middlewares/auth');

// Route for User Login
router.post("/login", login);

// Route for User Sign Up
router.post("/signup", signup); 

// Testing Routes for Single Middleware
router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Protected Test Route"
    });
});

// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student"
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success : true,
        message: "Welcome Admin"
    })
})

// By ID Fetch all the data
router.get('/getData', auth, async (req, res) => {
    try{
        const userData = req.user.id;
        const userObj = await User.findById(userData);
        console.log("User Data ID:", userObj);
        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            user: userObj
        })
    }
    catch(err){
        console.error("[GET DATA ERROR]", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        })
    }
})

// Export the Router
module.exports = router;