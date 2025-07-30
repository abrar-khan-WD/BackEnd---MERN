// Import Express and other required modules

const express = require('express');
const router = express.Router();

// Import the Blog Controller

const blogController = require('../controllers/blogController');

// define the route for the dummy link
router.get("/dummy-link", blogController);

// Export the router
module.exports = router;