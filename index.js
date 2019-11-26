const aws = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');


const listingFiles = async () => {
    try {
        aws.config.setPromisesDependency();
        console.log(process.env.AWS_SECRET_ACCESS_KEY)
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-2'
        })

        const s3 = new aws.S3();
        const result = await s3.listObjectsV2({
            Bucket: 'lcloud-427-ts',
            Prefix: 'filter' //filtering files using Prefix options
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

const deleteFile = async (regex) => {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-2'
        })

        const s3 = new aws.S3();

        let matchingObjects = [];
        let match = new RegExp(regex)

        const result = await s3.listObjectsV2({
            Bucket: 'lcloud-427-ts',
            Prefix: 'filter' //filtering files using Prefix options
        }).promise();

        for (let i = 0; i < result.Contents.length; i++) {
            if (match.test(result.Contents[i])) {
                matchingObjects.push(result.Contents[i].Key);
            }
        }

        const params = {
            Bucket: 'lcloud-427-ts',
            Delete: {
                Objects: matchingObjects,
                Quiet: false
            }
        };

        s3.deleteObjects(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File removed successfully`);
        });

    } catch (error) {
        console.log(error);
    }
}

//listingFiles();
//uploadFile('./fileToUpload.txt');

deleteFile('filter')

