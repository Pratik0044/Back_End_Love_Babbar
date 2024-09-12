const Todo = require("../models/todo")

exports.updateTodo = async(req, res) => {
    try {
        // sabse pahale to hame id chahiye
        const id = req.params.id;
        const {title,description} = req.body;
        const todo = await Todo.findByIdAndUpdate({_id: id},{title, description, updatedAt: Date.now()})
        if(!todo){
            return res.status(404).json({
                success:false,
                message: "No data found with Given Id"
            })
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo id:${id} data successfully Updated`
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