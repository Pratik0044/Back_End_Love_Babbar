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

async function uploadFileToCloudinary(file, folder){
    const options = {folder}
    return  await cloudinary.uploader.upload(file.tempFilePath,options)
}
// image upload

exports.imageUpload = async(req,res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType =  file.name.split('.')[1].toLowerCase();

        if( !isFileTypeSupported(fileType,supportedTypes)){
            return res.status(415).json({
                status:false,
                message:"The file format is not supported, Please try with other format"
            })
        }
        console.log("uploading to backend tutorial");
        
        const response = await uploadFileToCloudinary(file,"Backend Tutorial");
        console.log(response);
        

        // db me entry ko save karana hai 
        console.log("Data uploading in DB");
        
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
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