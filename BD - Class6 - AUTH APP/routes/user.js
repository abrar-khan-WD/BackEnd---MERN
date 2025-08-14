const express = require('express');
const router = express.Router();

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
        message: "Welcome to the Test Route"
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

// Export the Router
module.exports = router;