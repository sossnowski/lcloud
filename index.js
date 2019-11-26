const aws = require('aws-sdk');
require('dotenv').config();


work = async () => {
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
        console.log(result);
    } catch (error) {
        console.log(error);
    }


}

work();

