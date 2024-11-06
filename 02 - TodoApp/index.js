const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;


// middleware to parse json request body


app.use(express.json());

// import routes for TODO API

const todoRoutes = require("./routes/todos")

// mount the todo API routes
                                                                             
app.use("/api/v1", todoRoutes)

app.listen(PORT,()=>{
    console.log(`Server started successfully at ${PORT}`);
})

// connect to the DATABASE

const dbConnect = require("./config/database");
dbConnect();

// defaut Route
app.get("/",(req,res)=> {
    res.send(`<h1> This is HOMEPAGE body </h1>`)
})