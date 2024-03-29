import {config, logger} from './utils/index.js';
import app from './app.js';

const server = app.listen(config.backend.internalPort);

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled rejection at Promise: ${error.message}.`, {error});
});

server.on('listening', () => {
    logger.info(`Application started on ${config.backend.internalUrl}`);
});
