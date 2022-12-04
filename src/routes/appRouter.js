const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const {uploadFile} = require('../config/s3')
const sharp  =  require("sharp");
const crypto =  require("crypto");


const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


router.post('/images',upload.single('image'), async (req,res) => {
    const type = req.body.type
    const file = req.file
    console.log(file)
    let uploadedFile 
    const name = randomName() + "." + file.originalname.split(".")[1]
    if(type == "restaurant"){
                
        let buffer = await sharp(req.file.buffer).resize(100,67).toBuffer()
        let uploadedFile = await uploadFile(buffer,"thumbnail",name)
        
        buffer = await sharp(req.file.buffer).resize(1000,667).toBuffer()
        uploadedFile = await uploadFile(buffer,"medium",name)

        buffer = await sharp(req.file.buffer).resize(1400,994).toBuffer()
        uploadedFile = await uploadFile(buffer,"large",name)

       
    }
    if(type == "dish"){
        buffer = await sharp(req.file.buffer).resize(1000,667).toBuffer()
        uploadedFile = await uploadFile(buffer,"dish",name)
    }
    
    res.status(200).send({success: true, uploadedFile,name});
    
    
})


module.exports = router;