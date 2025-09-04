// App Create
const express = require('express');
const app = express();


// PORT FIND KARNA HAI
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE ADD KARNA HAI
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// DB SE CONNECTION
const db = require('./config/database');
db.connectDatabase();


// CLOUD SE CONNECT KARNA HAI
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


// MOUNTINGRoutes
const localFileUpload = require('./routes/localFileUpload');
app.use('/api/v1/upload', localFileUpload);


// DEFAULT ROUTE
app.get('/', (req, res) => {
    // Handle file upload
    res.send("Welcome to Image Uploading API");
});


// ACTIVATE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});