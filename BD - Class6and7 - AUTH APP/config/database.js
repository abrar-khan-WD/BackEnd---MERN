const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    mongoose.connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error:', err.message);
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the process with failure
    });
}