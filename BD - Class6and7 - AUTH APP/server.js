const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import database connection
const {connectDB} = require('./config/database');
connectDB();

//ROUTES
const userRoutes = require('./routes/user');
app.use("/api/v1/users", userRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Auth App');
});