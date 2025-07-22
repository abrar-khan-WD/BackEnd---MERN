const express = require('express');
const app = express();

// require .env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;


// Import database connection
const dbConnection = require("./config/database");
dbConnection();

// middelware use to parse JSON data
app.use(express.json())

// Set Default Route
app.get("/", (req, res) => {
    res.send("<h1>This is the New Home of TODO APP</h1>");
})

// import routes api
const todoRoutes = require('./routes/todo')
// use routes
app.use("/api/v1", todoRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});