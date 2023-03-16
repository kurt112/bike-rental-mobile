import AWS from 'aws-sdk'
import {axiosSubmit} from "../../.config/api";
import {v4 as uuidv4} from 'uuid'

const bucketName = 'bike-rental-file';
const accessKeyId = 'AKIARAUEOOURBYLNRYUG';
const secretAccessKey = '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';

AWS.config = new AWS.Config();
AWS.config.accessKeyId = accessKeyId;
AWS.config.secretAccessKey = secretAccessKey;
AWS.config.region = 'ap-southeast-1';


const s3 = new AWS.S3();



export const uploadToS3 = async (image: any, bike: any) => {
    const extension = image.name.split('.').pop();
    const type = image.mimeType
    const imageName = `${uuidv4()}.${extension}`;
    await s3.putObject({
        Key: imageName,
        Bucket: bucketName,
        Body: image,
        ACL: 'public-read',
        ContentType: type
    }).promise()
        .then(ignored => {
            if(bike !== null){
                axiosSubmit.post(`bike/${bike.id}/photo/${imageName}`)
            }
        }).catch(error => {
            console.log(error)
        });


    return imageName
}

export const deleteToS3 = async (key: string) => {
    const params = {  Bucket: bucketName, Key: key };
    s3.deleteObject(params, function(err) {
        if (err) console.log(err, err.stack);  // error
        else     console.log(err);                 // deleted
    });
}
