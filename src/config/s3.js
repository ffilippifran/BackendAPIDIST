const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

module.exports.uploadFile = function(file,folder,name){
    const uploadParams ={
        Bucket: bucketName,
        Body: file,
        folder: folder,
        Key: folder + "/" + name
    }
    console.log(uploadParams)
    return s3.upload(uploadParams).promise()
}