const { default: mongoose } = require("mongoose");
const nodemailer =  require("nodemailer")
require('dotenv').config()
const fileSchema =  new  mongoose.Schema({
    name:{
        type:String,
        required:true,
   },
    tags:{
        type:String
    },
    email:{
        type:String
    },
    imageUrl:{
        type:String
    },
    
});

// post middleware

fileSchema.post("save", async function(doc){ // doc wo parameter hai entry DB me create hoti h
    try{    
        console.log("DOC: " , doc);
        // sabase pahale hame transpotar create karana padega

        console.log("MAIL_HOST:", process.env.MAIL_HOST);
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("MAIL_PASS:", process.env.MAIL_PASS);

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        // send mail

        let info =await transporter.sendMail({
            from:`Pratik ke website se mail aaya hia padh lo`,
            to: doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hello Shubham Jee</h2> <p>Kahe n padhate re kukura</p>`
        })
        console.log("INFO:",info);
        
    }catch(er){
        console.log("error in post middleware : ",er);
        console.error(er);
    }
})

module.exports = mongoose.model("File",fileSchema)