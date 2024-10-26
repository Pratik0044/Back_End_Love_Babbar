const express = require('express');
const app = express();

app.listen(4000,()=>{
    console.log("This is testing of backend");
})

app.use(express.json());

app.get('/',(req,response)=>{
   response.send("Hello jee")
})