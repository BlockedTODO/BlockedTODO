import {config, logger} from './utils/index.js';
import app from './app.js';

const server = app.listen(config.backend.internalPort);

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection at Promise: ${error.message}\n${error.stack}`);
});

server.on('listening', () => {
    logger.info(`Application started on ${config.backend.internalUrl}`);
});
