import {config} from './utils/index.js';
import {logger} from './utils/index.js';
import app from './app.js';

const {protocol, host, port} = config.backend;
const server = app.listen(port);

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection at Promise: ${error.message}`);
});

server.on('listening', () => {
    logger.info(`Application started on ${protocol}://${host}:${port}`);
});
