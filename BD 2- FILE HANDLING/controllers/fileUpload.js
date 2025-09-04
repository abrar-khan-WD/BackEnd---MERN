//  Import Models
const Files = require("../models/file");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// localFileUpload - Handler Function
exports.localFileUpload = async (req, res) => {
  try {
    // fethcing the files
    const files = req.files.file;
    console.log("File ka data", files);

    // Path define karna
    const path =
      __dirname + "/files/" + Date.now() + `.${files.name.split(".")[1]}`;
    console.log(path);

    // Move File
    files.mv(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("File upload failed");
      }
      // File uploaded successfully
      res.status(200).send("File uploaded successfully");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("File upload failed");
  }
};

// Image Uploader Handle

// function for Cloudinary
async function uploadFileCloudinary(file, folder,quality) {
  try {
    // image and video
    const options = { folder: folder,  resource_type: "auto" };
    if(quality){
        options.quality = quality;
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (err) {
    console.error(err);
  }
}

exports.imageUpload = async (req, res) => {
  try {
    // Data Fetch
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const uploadedFile = req.files.imageFile;
    console.log(uploadedFile);

    // Validation

    const supportedTypes = ["jpeg", "jpg", "png"];
    const fileType = uploadedFile.name.split(".")[1].toLowerCase();
    console.log("This is file type:", fileType);
    // Validate if format is not matched
    if (!supportedTypes.includes(fileType)) {
      console.log("You have entered unsupported file type");
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
        error: "File type must be one of the following: jpeg, jpg, png",
      });
    }

    // Upload to Cloudinary
    const uploadDetails = await uploadFileCloudinary(
      uploadedFile,
      "Codegyaani"
    );
    console.log("This is upload details:", uploadDetails);

    // Save the Entry to Database
    const fileData = await Files.create({
      name,
      email,
      tags,
      imageUrl: uploadDetails.secure_url,
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: uploadDetails.secure_url,
      data: uploadDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Image upload failed",
      error: err.message,
    });
  }
};

// VideoUpload Handler

exports.videoUpload = async (req, res) => {
  try {
    
    // fetch data
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const videofile = req.files.videofile;
    console.log(videofile);

    // Validations
    const supportedTypes = ["mp4", "mov"];
    const requiredType = videofile.name.split(".")[1].toLowerCase();

    //limit 5

      if (!supportedTypes.includes(requiredType)) {
      console.log("You have entered unsupported file type");
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
        error: "File type must be one of the following: jpeg, jpg, png",
      });
    }

    // Upload to Cloudinary
    console.log('before cloudinary')
    const uploadVideoDetails = await uploadFileCloudinary(videofile, "Codegyaani");
    console.log("This is upload details:", uploadVideoDetails);


    // Save in database
    const fileData = await Files.create({
      name,
      email,
      tags,
      imageUrl: uploadVideoDetails.secure_url,
    });
    res.json({
      success: true,
      message: "Video uploaded successfully",
      imageUrl: uploadVideoDetails.secure_url,
      data: uploadVideoDetails,
    });
  }
  
  catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Video upload failed",
      error: err.message,
    });
  }
};


// Reducer

exports.imageReducer = async (req, res) => {
  try {
    // Data Fetch
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const uploadedFile = req.files.imageFile;
    console.log(uploadedFile);

    // Validation

    const supportedTypes = ["jpeg", "jpg", "png"];
    const fileType = uploadedFile.name.split(".")[1].toLowerCase();
    console.log("This is file type:", fileType);
    // Validate if format is not matched
    if (!supportedTypes.includes(fileType)) {
      console.log("You have entered unsupported file type");
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
        error: "File type must be one of the following: jpeg, jpg, png",
      });
    }

    // Upload to Cloudinary
    const uploadDetails = await uploadFileCloudinary(uploadedFile,"Codegyaani", 30);
    console.log("This is upload details:", uploadDetails);

    // Save the Entry to Database
    const fileData = await Files.create({
      name,
      email,
      tags,
      imageUrl: uploadDetails.secure_url,
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: uploadDetails.secure_url,
      data: uploadDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Image upload failed",
      error: err.message,
    });
  }
};
