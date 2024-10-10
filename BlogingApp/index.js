const express = require('express')
const app = express();

const router= require('./routes/blog')

app.use(express.json())

require('dotenv').config();
const PORT = process.env.PORT||3000;

const dbConnect = require("./config/database")
dbConnect();


app.use('/api/v1/',router)

app.listen(PORT,()=>{
    console.log("Server start successfully ");
    
})

app.get("/",(req,res)=>{
    res.send(`<h1>HELLO JEE</h1>`)
 })