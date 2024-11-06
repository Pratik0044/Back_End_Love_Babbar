const express = require("express")
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("hello ji I have started at PORT number: ", PORT);
    
})

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("heelo ji")
})

require("./config/database").dbConnect();