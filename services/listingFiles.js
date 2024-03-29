exports.get = async (s3, regex) => {
    try {
        let matchingObjects = [];
        let match = new RegExp(regex);
        const result = await s3.listObjectsV2({
            Bucket: 'lcloud-427-ts',
            Prefix: 'filter' //filtering files using Prefix options
        }).promise();
        for (let i = 0; i < result.Contents.length; i++) {
            if (match.test(result.Contents[i])) {
                matchingObjects.push(result.Contents[i].Key);
            }
        }
        return matchingObjects;
    } catch (error) {
        console.log(error);
    }
};
