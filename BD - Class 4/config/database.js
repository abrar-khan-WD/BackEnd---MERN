const mongoose = require ('mongoose');
require ('dotenv').config();

const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
})
.then (() => {
    console.log("Database connected successfully")
})
.catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
});
}

module.exports = connectDb;
