const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Middleware to parse 
app.use(express.json());

// get request
app.get("/", (req, res) => {
    res.send("<h1>HELLO CODE WITH ABRAR</h1>");
})

// post request
app.post("/car", (req, res) => {
    res.send("Car is created");
})