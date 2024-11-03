// import model

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic

exports.createComment = async (req,res) => {
    try{
        //fetch data from req body

        const {post, user, body} = req.body

        // create a comment
        
        const comment = new Comment({
            post,user,body
        });

        // Save the new Comment object into the database

        const savedComment = await comment.save();

        // find the post by ID, add new commnet into that post's comment array
        const updatePost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true}) // $push: yah ek naya update operatore hai
                    .populate("comments")   // populate the comment array with comment documnet
                    .exec();

        res.json({
            post: updatePost,
        });


    }
    catch(error){
        return res.status(500).json({
            error: "Error while creating comment",
        })
    }
}