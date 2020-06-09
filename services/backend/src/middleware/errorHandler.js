const logger = require('utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Internal Server Error');
};

module.exports = errorHandler;
