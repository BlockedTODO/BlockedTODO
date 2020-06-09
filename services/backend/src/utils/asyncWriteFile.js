const fs = require('fs');

/* Promisify writing a file from a stream function so we can use it with async/await
 * As per https://github.com/nodejs/node/issues/28545, the fs promises API does not support this functionality. */
const asyncWriteFile = (data, outputPath) => {
    return new Promise((resolve, reject) => {
        const stream = data.pipe(fs.createWriteStream(outputPath));

        stream.on('close', () => {
            console.log('file written');
            resolve(outputPath);
        });
    });
};

module.exports = asyncWriteFile;
