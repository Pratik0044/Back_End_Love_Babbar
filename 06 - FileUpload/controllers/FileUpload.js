const fileSchema = require("../models/File")

exports.localFileUpload = async (req,res)=>{
try{
    // fetch file frome body of the site
    const file = req.files.file;
    console.log("File aa gayi dekh lo kaisa hai : ", file);

    // kis path par apane file ko upload karana chahate hai
    let path = __dirname + "/files/" + Date.now();
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