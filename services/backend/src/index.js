import {config, logger} from './utils/index.js';
import app from './app.js';

const server = app.listen(config.backend.port);

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection at Promise: ${error.message}`);
});

server.on('listening', () => {
    logger.info(`Application started on ${config.backend.url}`);
});
