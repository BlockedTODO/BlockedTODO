const logger = require('utils/logger');
const {AuthenticationError} = require('utils/errors');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    if (err instanceof AuthenticationError) {
        res.status(401).json({message: err.message});
    } else {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = errorHandler;
