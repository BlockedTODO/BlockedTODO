const fs = require('fs');
const unzipper = require('unzipper');
const logger = require('utils/logger');

/* Promisify stream unzip function so we can use it with async/await */
const asyncUnzip = (zipFile, outputPath) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(zipFile)
            .pipe(unzipper.Extract({path: outputPath}));

        stream.on('close', () => {
            logger.info(`file unzipped: ${outputPath}`);
            resolve(outputPath);
        });
    });
};

module.exports = asyncUnzip;
