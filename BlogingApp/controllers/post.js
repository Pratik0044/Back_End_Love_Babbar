
const Post = require("../models/postModel")

exports.createPost = async(req,res) => {
    try{
        const {title, body} = req.body;

        const createdPost = await Post.create({title, body});

        res.status(200).json(
            {
                success: true,
                data: createdPost,
                message: 'Post Created Successfully'
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        })
    }
}

exports.getPost = async(req,res)=>{
    try{
        const post = await Post.find({});
        res.status(200).json({
            status:true,
            data:post,
            message:"Post have fetched successfully"
        })
            
    }
    catch(error){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        })
    }
}