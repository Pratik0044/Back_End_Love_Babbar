const mongoose = require('mongoose')

require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect('process.env.DATABASE_URL',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("DB connected Successfully")})
    .catch((error)=>{console.log("Recieved an Error in connection of DB",error)
        console.log(error);
        process.exit(1);
        
    })
}


module.exports = dbConnect;