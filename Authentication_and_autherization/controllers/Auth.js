const bcrypt = require("bcrypt");
const User = require("../models/user")

exports.signup = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        //if user already exist

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exist. Try with another Email"
            });
        }
        //secure password

        let hashedPassword;
        try{
        hashedPassword= await bcrypt.hash(password,10)
        }
        catch(er){
            return res.status(500).json({
                success:false,
                message:"Error in hashing Password"
            });
        }

        // create user

        const user = await User.create({name,email,password:hashedPassword,role});

        return res.status(200).json({
            success:true,
            message:"User created successfully",
        })

    }
    catch(er){
        console.error(er);
        return res.status(500).json({
            success:false,
            message:"User can not be register, Please try again later",
        })
    }
}