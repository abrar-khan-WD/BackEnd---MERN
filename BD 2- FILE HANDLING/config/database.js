const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(err => {
        console.log('Sorry ! Your database connection failed');
        console.error("Database connection error:", err);
        process.exit(1);
    });
}