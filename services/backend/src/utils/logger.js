import winston from 'winston';
import stringifyObject from 'stringify-object';

const {createLogger, format, transports} = winston;

const environment = process.env.NODE_ENV || 'development';
const logLevel = environment === 'test' ? 'warn' : 'info';

const logFormat = format.printf((data) => {
    const message = typeof data.message === 'string' ? data.message : stringifyObject(data.message, {indent: '    '});
    return `${data.level}: ${message}`;
});

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
    // To see more detailed errors, change this to "debug"
    level: logLevel,
    format: format.combine(
        format.splat(),
        format.simple(),
        format.colorize(),
    ),
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(
                format.colorize(),
                logFormat,
            )
        }),
    ],
});

export default logger;
