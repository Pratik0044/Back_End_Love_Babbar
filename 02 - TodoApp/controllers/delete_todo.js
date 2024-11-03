const Todo = require("../models/todo")

exports.deleteTodo = async(req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `Todo item deleted successfully`
        })
    } catch (e) {
        console.error(e);
        console.log(e);
        res.status(500).json({
            success: false,
            error:e.message,
            message: "Server Error"
        })
    }
} 