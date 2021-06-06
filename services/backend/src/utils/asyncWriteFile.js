import fs from 'fs';
import logger from './logger.js';

/* Promisify writing a file from a stream function so we can use it with async/await
 * As per https://github.com/nodejs/node/issues/28545, the fs promises API does not support this functionality. */
const asyncWriteFile = (data, outputPath) => {
    return new Promise((resolve, reject) => {
        const stream = data.pipe(fs.createWriteStream(outputPath));

        stream.on('close', () => {
            logger.info(`file written: ${outputPath}`);
            resolve(outputPath);
        });
    });
};

export default asyncWriteFile;
