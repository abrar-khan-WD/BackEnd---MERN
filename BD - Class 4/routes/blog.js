const express = require('express');
const router = express.Router();

const {likeController} = require('../controllers/likeController');

router.get("/dummy", likeController);

// Export the router
module.exports = router;
