const fs = require('fs');

exports.index = async (s3, fileName) => {
    try {
        const fileContent = fs.readFileSync(fileName);

        const params = {
            Bucket: 'lcloud-427-ts',
            Key: 'uploadedFile.txt',
            Body: fileContent
        };

        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            return true;
        });

    } catch (error) {
        console.log(error);
    }
};
