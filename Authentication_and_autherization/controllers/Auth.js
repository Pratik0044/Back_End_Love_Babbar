const bcrypt = require("bcrypt");
const User = require("../models/user")
const jwt = require("jsonwebtoken");
require('dotenv').config()

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

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        
        // validation of email and password
        if(!email || !password){
            return res.status(400).json({
                success:fasle,
                message:"Please enter correct data.",
            })
        }
        // Fetch data from Database
        let userPresent = await User.findOne({email});

        // User not register
        if(!userPresent){
            return res.status(401).json({
                success:false,
                message:"Try to signup First. Email not registered.",
            })
        }
        // Verify Password and Generate a JWT Token;
        const payload = {
            email : userPresent.email,
            id: userPresent._id,
            role: userPresent.role,
        }
        if( await bcrypt.compare(password,userPresent.password)){

            //Password matches

            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                expiresIn:"2h",
            })

            userPresent = userPresent.toObject();
            userPresent.token = token;
           
            userPresent.password = undefined;
   
            

            const options ={
                expires : new Date( Date.now() +3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userPresent,
                message:"User Logged In successfully:"
            })

        }
        // Password didn't match
        else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect."
            })
        }
    }
    catch(er){
        console.log(er);
        res.status(500).json({
            success:false,
            message:"User Detail fetching Error",
        })

    }
}
