const express = require('express');
const app = express();
require('dotenv').config();

// PORT Configuration
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
const connectDB = require('./config/database');
connectDB();


// Default route
app.get("/", (req, resp) => {
  resp.send("<h1>Welcome to the Blog API</h1><h2>Use /api/v1/blog for blog operations</h2>");
})

// Importing the dummy route
const dummyRoute = require('./routes/blog');
app.use('/api/v1', dummyRoute);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Export the app for testing purposes
module.exports = app;