const express = require("express")
const app = express();
const fileupload = require("express-fileupload")
require('dotenv').config();
const PORT = process.env.PORT || 3000;



app.use(express.json());

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'}
));

app.get("/",(req,res)=>{
    res.send("heelo ji")
})

const db = require("./config/database")
db.dbConnect()

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

const upload = require('./routes/FileUpload')
app.use('/api/v1/upload',upload);

app.listen(PORT,()=>{
    console.log("hello ji I have started at PORT number: ", PORT);
    
})