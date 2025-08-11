const express = require('express');
const router = express.Router();

const {login, signup} = require('../controllers/Auth');

// Route for User Login
// router.post("/login", login);

// Route for User Sign Up
router.post("/signup", signup); 


// Export the Router
module.exports = router;