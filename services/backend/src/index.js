import logger from './utils/logger.js';
import app from './app.js';

const host = app.get('host');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection at Promise: ${error.message}`);
});

server.on('listening', () => {
    logger.info(`Application started on http://${host}:${port}`);
});
