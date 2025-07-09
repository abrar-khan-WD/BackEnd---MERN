// Step 1 - CREATE SERVER
const express = require('express');
const app = express();

// Body parser middleware to parse JSON bodies
const bodyParser = require('body-parser');;
app.use(bodyParser.json());

// Step 2 - Declare a PORT
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// Step 3 - Create a GET route
app.get("/", (request, response) => {
    response.send("Hello World !!");
})

// Step 4 - Create a POST route
app.post("/api-cars", (request, response) => {
    const {name, model} = request.body;
    console.log("Car Name:", name);
    console.log("Car Model:", model);
    response.send("Car details received successfully!");
})