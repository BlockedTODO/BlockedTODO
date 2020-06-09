const {createLogger, format, transports} = require('winston');
const stringifyObject = require('stringify-object');

const environment = process.env.NODE_ENV || 'development';
const logLevel = environment === 'test' ? 'warn' : 'info';

const logFormat = format.printf((data) => {
    return `${data.level}: ${stringifyObject(data.message, {indent: '    '})}`;
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

module.exports = logger;
