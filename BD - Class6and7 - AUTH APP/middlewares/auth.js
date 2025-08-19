// Authentication 
// Authorization - isStudent, isAdmin

const jwt = require ('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
     
        console.log("Cookie used for fetching", req.cookies.codegyaani);
        // console.log("Body uses for fetching token", req.body.token);
        // Get the token from request body
        const token = req.cookies.codegyaani
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }
        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode; // Attach user info to request object
        }
        catch(err) {
            return res.status(401).json({
                success: false,
                message : "Invalid token"
            })
        }
        next(); 

    }
    catch(err) {
        console.error("[AUTH MIDDLEWARE ERROR]", err);
        return res.status(500).json({
            success: false,         
            message : "Something went wrong",
            error: err.message  
        })
    }
}

// sTUDENT Authorization 
exports.isStudent = (req, res, next) => {
    try{
         if(req.user.role !== 'student') {
        return res.status(403).json({
            success: false,
            message: "Access denied for this user"
        })
    }}
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
   next();
}

// Admin Authorization

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied for this user"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
   next();
}