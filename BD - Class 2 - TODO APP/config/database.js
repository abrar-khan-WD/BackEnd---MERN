const mongoose = require('mongoose');
// Importing the environment variables
require('dotenv').config();

function dbConnection() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    })
        .then(() => { console.log("Database connected successfully") })
        .catch((error) => {
            console.log("BHai kuch toh gadbad hai");
            console.error("Database connection error:", error);
            // Isko samajho ki agar database connection mein error aata hai toh process ko band kar do
            process.exit(1)
        })
}

module.exports = dbConnection