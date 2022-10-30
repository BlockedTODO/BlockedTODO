import logger from '../utils/logger.js';
import {AuthenticationError} from '../utils/errors.js';

const errorHandler = (err, req, res, next) => {
    logger.error({error: err});
    if (err instanceof AuthenticationError) {
        res.status(401).json({message: err.message});
    } else {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export default errorHandler;
