const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1); // Exit the process with failure
    });
};

module.exports = connectDB;
