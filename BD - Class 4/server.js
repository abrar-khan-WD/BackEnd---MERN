const express = require ('express');
const app = express();

// Find the Port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Miidleware to parse JSON
app.use(express.json());

// Routes to handle requests
const blog = require('./routes/blog');

// mount the blog routes
app.use("/api/v1", blog);

// DB Connection
const connectDB = require ("./config/database");
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Default route
app.get('/', (req, res) => {    
    res.send('Welcome to the Blog API');
});
