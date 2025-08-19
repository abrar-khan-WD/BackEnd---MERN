const brcypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

// Sign Up Route Handler
exports.signup = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the pasword
    let hashedPassword;
    try {
      hashedPassword = await brcypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error hashing password",
      });
    }
    // Create a new user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role || "user", // Default to 'user' if no role is provided
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User creation failed, Please try again",
      error: err.message,
    });
  }
};

 const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
      };

// Login

exports.login = async (req, res) => {
  try {
    // Fetch Email and Password from Body
    const { email, password } = req.body;
    // Validate Email and Password if user have entered
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    //Check if user exists
    let user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }
    // Validate Password
    const isMatch = await brcypt.compare(password, user.password);
    let payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    };
    if (isMatch) {
      //password matched
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      console.log(user);
      // Convert to Object
      user = user.toObject();
      user.token = token;
      console.log(user);
      user.password = undefined; // Remove password from user object
      console.log(user);

      // Creation of Cookie

      res.cookie("codegyaani", token, options)

      return res.status(200).json({
          success: true,
          message: "Login successful",
          token: user.token,
          cookies : {
              token: token
          },
          user: user
      });
    }
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed, Please try again",
      error: err.message,
    });
  }
};
