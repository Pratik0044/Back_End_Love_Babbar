const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT || 4000,()=>{
    console.log("This is testing of backend");
})

app.use(express.json());

app.get('/',(req,response)=>{
   response.send("Hello jee")
})
require("./config/database").connect();

const user = require('./routes/user');
app.use("/api/v1",user);