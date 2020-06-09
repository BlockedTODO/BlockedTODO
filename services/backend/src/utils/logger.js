const {createLogger, format, transports} = require('winston');

const environment = process.env.NODE_ENV || 'development';
const logLevel = environment === 'test' ? 'warn' : 'info';

// Properly display JavaScript sets with JSON.stringify with this replacer
const setToJSON = (key, value) => {
    if (typeof value === 'object' && value instanceof Set) {
        return [...value];
    }
    return value;
}

const logFormat = format.printf((data) => {
    return `${data.level}: ${JSON.stringify(data.message, setToJSON, 4)}`;
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
