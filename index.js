const aws = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');


listingFiles = async () => {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-2'
        })

        const s3 = new aws.S3();
        const result = await s3.listObjectsV2({
            Bucket: 'lcloud-427-ts',
        }).promise();
        for (let i = 0; i < result.Contents.length; i++) {
            console.log(result.Contents[i])
        }
    } catch (error) {
        console.log(error);
    }


}

const uploadFile = (fileName) => {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-2'
        })
        const fileContent = fs.readFileSync(fileName);

        const params = {
            Bucket: 'lcloud-427-ts',
            Key: 'uploadedFile.txt',
            Body: fileContent
        };
        const s3 = new aws.S3();

        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });

    } catch (error) {
        console.log(error);
    }
};

//listingFiles();
uploadFile('./fileToUpload.txt');

