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

    } catch(er){
        res.status(400).json({
            success:false,
            message:"There are something error in Middleware {Auth} "
        })
    }
}