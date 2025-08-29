// Listen to port
const express  = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import Cloudinary

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
})

// Upload MEDIA to Cloudinary
const file = req.files.file // Means this is uploaded from form
cloudinary.uploader.upload(file.tempFilePath, function(error, result) {
    if(error) {
        console.log(`Error uploading file: ${error}`);
        res.status(500).send('Error uploading file');
    }   
    if(result) {
        console.log('File uploaded successfully');
        res.status(200).send('File uploaded successfully');
    }
})

// Node Mailer Integration
const nodemailer = require('nodemailer');
const trasnsporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
}) 

//  Email options
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@gmail.com',
    subject: 'File Uploaded Successfully',
    text: 'Your file has been uploaded to Cloudinary successfully.',
    attachments: [
        {
            filename: 'uploaded_file.jpg',
            path: '/path/to/uploaded_file.jpg'
        }
    ]
}

// Send Email
trasnsporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(`Error sending email: ${error}`);
    } else {
        console.log(`Email sent: ${info.response}`);
    }
})

// express.file-upload

// Import
// const express = require ('express');
// const app = express();
// const fileUpload = require('express-fileupload');

// app.use(fileUpload());

// app.post('/uploads', (req, res) => {
//     const file = req.files.file;
//     file.mv("/uploads" + file.name, (err) => {
//         if(err){
//             return res.status(500).json({
//                 message: "Error",
//                 error: err
//             });
//         }
//         return res.status(200).json({
//             message: "File uploaded successfully",
//             filePath: "/uploads" + file.name
//         });
//     });
// })

// Handling File Uploads
const express = require('express');
// const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Store File
app.post('/uploads', (req, res)=> {
    const files = req.file.file;
    files.mv('/upload' + files.name, (err) => {
        return res.status(200).json({
            message: "File uploaded successfully",
            filePath: "/uploads" + files.name
        });
        {
            return res.status(500).json({
                message: "Error",
                error: err
            });
        }
    })
})

// express.urlencoded
// Like When User Fills the form it send tot he browser in aspecial format
app.use(express.urlencoded({extended: true}))
// express.json
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Perform login logic here

})

// __dirname

const fs = require('fs');
const path = require('path');

// Join paths
const uploadsDir = path.join(__dirname, 'log.txt')
console.log(uploadsDir);

// Read the File
fs.readFile(uploadsDir, (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
    } else {
        console.log(`File contents: ${data}`);
    }
});