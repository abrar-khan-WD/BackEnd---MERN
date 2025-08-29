// Import Express
const express = require ('express');

// Middleware
const router = express.Router();

// Import Controller
const {localFileUpload} = require ('../controllers/fileUpload');

// Routes Path
router.post('/localFileUpload', localFileUpload);

// Export Router
module.exports = router;