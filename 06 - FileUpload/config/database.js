const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")
require('dotenv').config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("------------ DB connect successfully ------------");
    }).catch((error)=>{

        console.log("XX******* DB NOT CONNECT *********XX");
        console.error(error)
        process.exit(1)
    })
}