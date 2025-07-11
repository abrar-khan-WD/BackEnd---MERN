const express = require('express');
const router = express.Router();

// Importing the createTodo controller
const {createTodo} = require('../controllers/createTodo');

// link to the createTodo controller
router.post("/createTodo", createTodo);

// Exporting the router
module.exports = router;