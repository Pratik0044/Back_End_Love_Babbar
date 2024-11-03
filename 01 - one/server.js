// A. Create your own server but it is not live 

const express = require('express');
const app = express();
// use to parse req.body in express -> POST or PUT

const bodyParser = require('body-parser');
// Parse Json data & add it to the request.body object

app.use(bodyParser.json())

// B. App kaha  listen kar rha hai uska Port number

app.listen(3000, ()=> {
    console.log("Server started at port number: 3000");
    
})

// C.a. Routes creation "/"

app.get('/',(req,res) => {
    res.send("Hello jee, this is my first backend code")
})

// C.b. Routes creation "/api/cars"
app.post('/api/cars' , (req,res) => {
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted succesfully")
   
})

// Mongoose ko create karana taki apane server ko ham apane database se jod paye

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Connectino Successful")})
.catch((error)=>{console.log("Recieved an Error: ",error)})
