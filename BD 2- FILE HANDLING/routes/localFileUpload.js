// Import Express
const express = require ('express');

// Middleware
const router = express.Router();

// Import Controller
const {localFileUpload} = require ('../controllers/fileUpload');
const {imageUpload} = require ('../controllers/fileUpload');
const {videoUpload} = require ('../controllers/fileUpload');
const {imageReducer} = require ('../controllers/fileUpload');

// Routes Path
router.post('/localFileUpload', localFileUpload);

router.post('/imageUpload', imageUpload);

router.post('/videoUpload', videoUpload);

router.post('/imageReducer', imageReducer);

// Export Router
module.exports = router;