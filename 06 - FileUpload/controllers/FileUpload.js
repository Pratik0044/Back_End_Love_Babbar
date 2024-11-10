const File = require("../models/File")
const cloudinary =  require("cloudinary").v2
exports.localFileUpload = async (req,res)=>{
try{
    // fetch file frome body of the site
    const file = req.files.file;
    console.log("File aa gayi dekh lo kaisa hai : ", file);

    // kis path par apane file ko upload karana chahate hai
    let path = __dirname + "/files/" + Date.now( ) + `.${file.name.split('.')[1]}`;
    console.log("PATH -->",path);

    file.mv(path , (err) => {
        console.log(err);

    })

    res.status(200).json({
        success:true,
        message: "Local file uploaded Successfully",
    })


}catch(error){
    console.log("not able to upload file",error);
    console.error(error);
    
}
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder}
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto"
    
    return  await cloudinary.uploader.upload(file.tempFilePath,options)
}
// image upload

exports.imageUpload = async(req,res)=>{
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile;
       

        //validation
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType =  file.name.split('.')[1].toLowerCase();

        if( !isFileTypeSupported(fileType,supportedTypes)){
            return res.status(415).json({
                status:false,
                message:"The file format is not supported, Please try with other format"
            })
        }
        
        const response = await uploadFileToCloudinary(file,"Backend Tutorial");
        
        

        // db me entry ko save karana hai 
        
        const fileData= await File.create({
            name,tags,email,imageUrl:response.secure_url,
        })

        res.status(200).json({
            status:true,
            message:"Your file is successfully Uploaded to the cloudinary."
        })

    }catch(er){
        console.error(er)
        res.status(415).json({
            status:false,
            message:"Somthing went wrong"
        })
    }
}

// Video Upload

exports.videoUpload = async(req,res)=>{
    try{
        //fetch the video file from req
        const file= req.files.videoFile;
        const {name,tags,email} = req.body;
        console.log(file);
        console.log(name,tags,email)
        

        const supportedTypes = ["mp4","mpv","mkv"]
        const fileType= file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        
        if(! isFileTypeSupported(fileType,supportedTypes)){
            return res.status(415).json({
                success:false,
                message:"File format does not supported, please try with another format"
            })
        }
        if(file.size/1048576 > 5 ){
            return res.status(413).json({
                success:false,
                 "message": "File size exceeds the 5MB limit"
            })
        }
        console.log("testing");
        
        const response = await uploadFileToCloudinary(file,"Backend Tutorial");
        console.log("testing2");
        const fileData= await File.create({
            name,tags,email,imageUrl:response.secure_url,
        })

        res.status(200).json({
            success:true,
            message:"Video uploaded successfully"
        })

    }catch(er){
        console.log(er);
        res.status(400).json({
            success:false,
            message: "Somthing went wrong in vido uploading"
        })
        
    }
}

// image size Reducer

exports.imageSizeReducer = async (req,res)=>{
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile;
       

        //validation
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType =  file.name.split('.')[1].toLowerCase();

        if(file.size/1048576 > 5 ){
            return res.status(413).json({
                success:false,
                 "message": "File size exceeds the 5MB limit"
            })
        }
        
        if( !isFileTypeSupported(fileType,supportedTypes)){
            return res.status(415).json({
                status:false,
                message:"The file format is not supported, Please try with other format"
            })
        }
        
        const response = await uploadFileToCloudinary(file,"Backend Tutorial",10);
        
        

        // db me entry ko save karana hai 
        
        const fileData= await File.create({
            name,tags,email,imageUrl:response.secure_url,
        })

        res.status(200).json({
            status:true,
            message:"Your file is successfully Uploaded to the cloudinary."
        })

    }catch(er){
        console.error(er)
        res.status(415).json({
            status:false,
            message:"Somthing went wrong"
        })
    }
}