const express = require('express');
const app = express();
require('dotenv').config();

// PORT Configuration
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import the routes from the routes file
const blog = require("./routes/blog");
app.use("/api/v1/blog", blog);


// Connect to the database
const connectDB = require('./config/database');
connectDB();

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Default route
app.get("/", (req, resp) => {
  resp.send("<h1>Welcome to the Blog API</h1><h2>Use /api/v1/blog for blog operations</h2>");
})

// Export the app for testing purposes
module.exports = app;