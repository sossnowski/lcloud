const aws = require('aws-sdk');
require('dotenv').config();
const listingFiles = require('./services/listingFiles');
const uploadFile = require('./services/uploadFile');
const deleteObjects = require('./services/deleteFiles');

const awsConnect = async () => {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-west-2'
        });
        const s3 = new aws.S3();

        const returnedObjects = await listingFiles.get(s3, 'example regex');
        const uploadSuccess = await uploadFile.index(s3, './fileToUpload.txt');
        const deleteSuccess = await deleteObjects.index(s3, 'example regex');
    } catch (error) {
        console.log(error);
    }
}

awsConnect();
