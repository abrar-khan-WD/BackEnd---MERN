const mongoose = require ('mongoose');
require ('dotenv').config();

const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        usenewNewUrlParser: true,
        useUnifiedTopology: true,
})
.then (() => {
    console.log("Database connected successfully")
})
.catch((error) => {
    console.error("Database connection failed:", error);
});
}

module.exports = connectDb;
