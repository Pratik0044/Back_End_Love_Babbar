const Post = require("../models/postModel")
const Like = require("../models/likeModel")

exports.createLike = async(req,res) => {
    try{
        const {post, user} = req.body

        const like = new Like({
            post,user
        })
        const savedLike = await like.save();
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                .populate("likes")
                .exec();
        
        res.json({
            post:updatedPost,
        })

    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "There are some error in Likes."
        })
        console.log("error");
    }
}