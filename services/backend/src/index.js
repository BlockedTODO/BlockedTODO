const {logger} = require('utils/');
const app = require('./app');

const host = app.get('host');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', () => {
    logger.info(`Application started on http://${host}:${port}`);
});
