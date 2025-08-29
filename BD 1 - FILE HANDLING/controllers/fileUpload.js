//  Import Models
const file = require('../models/File');

// localFileUpload - Handler Function
exports.localFileUpload = async (req, res) => {
    try{
        // fethcing the files
        const files = req.files.file;
        console.log('File ka data', files);

        // Path define karna
        const path = __dirname + '/files/' + Date.now() + `.${files.name.split('.')[1]}`;    
        console.log(path);

        // Move File
        files.mv(path, (err) => {
            if(err){
                console.error(err);
                return res.status(500).send('File upload failed');
            }
            // File uploaded successfully
            res.status(200).send('File uploaded successfully');
        })

    }
    catch(err){
        console.error(err);
        res.status(500).send('File upload failed');
    }
}

        