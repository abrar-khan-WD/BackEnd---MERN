// Pehle humne Todo model ko import kiya
const Todo = require("../models/Todo");

// Yeh function createTodo ko export karta hai
exports.createTodo = async (req, res) => {
    try {
        // Ham values ko destructure karte hain
        const { title, description } = req.body;
        // Todo ko create karte hain
        const response = await Todo.create({ title, description })
        // Agar response milta hai toh success message bhejte hain
        res.status(200).json({
            success: true,
            message: "Todo Created Successfully",
            data: response
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error creating Todo",
            error: error.message
        })
    }
    
}