const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{
        // extract JWT token
        // total 3 ways are present to fetch token 
        const token = req.body.token ;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not present"
            })
        }

        // Verify the token

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        } catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next()

    } catch(er){
        res.status(401).json({
            success:false,
            message:"Something error in Middleware {Auth} verifing the token"
        })
    }
}


exports.isStudent= (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a proteced route for student"
            })
        }
        next()
    }catch(er){
        res.status(500).json({
            success:false,
            message:"Something error in isStudnet middleware ->    USER ROLE IS NOT MATCHING."
        })
    }
    
}

exports.isAdmin =(req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a proteced route for Admin"
            })
        }
    }catch(er){
        res.status(500).json({
            success:false,
            message:"Something error in isAdmin middleware ->    USER ROLE IS NOT MATCHING."
        })
    }
}