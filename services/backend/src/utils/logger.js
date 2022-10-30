import winston from 'winston';
import {config} from './environment.js';

const {createLogger, format, transports} = winston;

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
};

const prettyFormat = format.printf(({level, message, ...metadata}) => {
    const formattedMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 4);

    let logMessage = `${level}: ${formattedMessage}`;

    if (metadata && Object.keys(metadata).length !== 0) {
        logMessage += `,\n${colors.fgMagenta}metadata${colors.reset}: ${JSON.stringify(metadata, null, 4)}`;
    }

    return logMessage;
});

const devFormat = format.combine(
    format.colorize(),
    prettyFormat,
);

const prodFormat = format.combine(
    format.timestamp(),
    format.json(),
);

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
    // To see more detailed errors, change this to 'debug'
    level: config.logLevel,
    format: config.environment === 'production' ? prodFormat : devFormat,
    transports: [new transports.Console()],
});

export default logger;
