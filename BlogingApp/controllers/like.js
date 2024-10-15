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

exports.disLike = async(req,res)=>{
    try{
        const {post,like} = req.body
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        //update the post collection

        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.status(200).json({
            status: true,
            Post:updatedPost,
            message: "Successefully Deleted the Liked Id"
        })
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "unsuccessfull"
        })
    }
}