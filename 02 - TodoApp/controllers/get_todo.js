
const Todo = require("../models/todo")

exports.getTodo = async(req,res)=>{
    try {
        // Sare ke sare Todo Item ko fetch karenge
        const todos= await Todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
            message: "Entire Todo data is fetched",
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


exports.getTodoById = async(req, res)=>{
    try{
        //Extract todo item by Id
        // const id = req.params.id; ek aur tarika hai niche
        const {id} = req.params;
       
        const todo = await Todo.findById({_id: id})

        // Agar data nahi mila
        if(!todo){
            return res.status(404).json({
                success:false,
                message: "No data found with Given Id"
            })
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo id:${id} data successfully fetched`
        })
    } catch(e){
        console.error(e);
        console.log(e);
        res.status(500).json({
            success: false,
            error:e.message,
            message: "Server Error"
        })
    }
}