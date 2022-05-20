import joi from 'joi';
import dotenv from 'dotenv';
import {dirpath} from './pathHelpers.js';

// Load up variables from .env file (if present).
// Note that if a variable is defined both in the environment and .env file, the environment variable value takes priority.
dotenv.config({path: `${dirpath(import.meta)}/../../.env`}); //TODO: handle REPL

// Define default for NODE_ENV here because other environment variable default values depend on NODE_ENV
const NODE_ENV = process.env.NODE_ENV ?? 'development';

const variables = {}; // Final formatted environment variables.
const schema = {}; // Joi schema used to validate the final formatted variables.
const secrets = {}; // Subset of variables that are marked secrets.

// Applies defaults and formats environment variables,
// and adds them to the validation schema and formatted/secret variables.
const loadEnvironmentVariable = ({name, secret, defaults, format, validation}) => {
    const value = process.env[name];

    // Provide sensible defaults when some options (parameters) are not provided or incomplete
    secret = secret ?? false;
    defaults = {development: null, test: null, production: null, ...defaults};
    format = format ?? ((variable) => variable);

    // Populate lists
    variables[name] = value ? format(value) : defaults[NODE_ENV];
    if (secret) {
        secrets[name] = variables[name];
    }
    if (validation) {
        schema[name] = validation;
    }

    return value;
};

const loadEnvironmentVariables = (environmentVariables) => {
    for (const environmentVariable of environmentVariables) {
        loadEnvironmentVariable(environmentVariable);
    }
};

loadEnvironmentVariables([
    {
        name: 'NODE_ENV',
        defaults: {development: 'development', test: 'test', production: 'production'},
        format: (value) => value ?? 'development',
        validation: joi.string().valid('development', 'test', 'production').required(),
    },
    {
        name: 'DATABASE_HOST',
        defaults: {development: 'database', test: 'database', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'DATABASE_PORT',
        defaults: {development: 5432, test: 5432, production: null},
        format: (variable) => parseInt(variable),
        validation: joi.number().port().required(),
    },
    {
        name: 'DATABASE_NAME',
        defaults: {development: 'app-database', test: 'app-database', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'DATABASE_USER',
        defaults: {development: 'app-database-user', test: 'app-database-user', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'DATABASE_PASSWORD',
        secret: true,
        defaults: {development: 'app-database-password', test: 'app-database-password', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'BACKEND_PROTOCOL',
        defaults: {development: 'http', test: 'http', production: 'https'},
        validation: joi.string().valid('http', 'https').required(),
    },
    {
        name: 'BACKEND_HOST',
        defaults: {development: 'localhost', test: 'localhost', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'BACKEND_PORT',
        defaults: {development: 3000, test: 3000, production: null},
        format: (variable) => parseInt(variable),
        validation: joi.number().port().required(),
    },
    {
        name: 'FRONTEND_PROTOCOL',
        defaults: {development: 'http', test: 'http', production: 'https'},
        validation: joi.string().valid('http', 'https').required(),
    },
    {
        name: 'FRONTEND_HOST',
        defaults: {development: 'localhost', test: 'localhost', production: null},
        validation: joi.string().hostname().required(),
    },
    {
        name: 'FRONTEND_PORT',
        defaults: {development: 3001, test: 3001, production: null},
        format: (variable) => parseInt(variable),
        validation: joi.number().port().required(),
    },
    {
        name: 'ENCRYPTION_SECRET',
        secret: true,
        defaults: {development: 'secret', test: 'secret', production: null},
        validation: joi.string().required(),
    },
    {
        name: 'GITHUB_WEBHOOKS_SECRET',
        secret: true,
        validation: joi.string().required(),
    },
    {
        name: 'GITHUB_APP_ID',
        validation: joi.string().required(),
    },
    {
        name: 'GITHUB_APP_PRIVATE_KEY',
        secret: true,
        format: (variable) => variable.replaceAll('\\n', '\n'),
        validation: joi.string().required(),
    },
    {
        name: 'GITHUB_CLIENT_ID',
        validation: joi.string().required(),
    },
    {
        name: 'GITHUB_CLIENT_SECRET',
        secret: true,
        validation: joi.string().required(),
    }
]);

// Run environment variable validation.
await joi.object(schema).validateAsync(variables);

const config = {
    environment: variables.NODE_ENV,
    database: {
        host: variables.DATABASE_HOST,
        port: variables.DATABASE_PORT,
        name: variables.DATABASE_NAME,
        user: variables.DATABASE_USER,
        password: variables.DATABASE_PASSWORD,
    },
    backend: {
        protocol: variables.BACKEND_PROTOCOL,
        host: variables.BACKEND_HOST,
        port: variables.BACKEND_PORT,
        url: `${variables.BACKEND_PROTOCOL}://${variables.BACKEND_HOST}:${variables.BACKEND_PORT}`
    },
    frontend: {
        protocol: variables.FRONTEND_PROTOCOL,
        host: variables.FRONTEND_HOST,
        port: variables.FRONTEND_PORT,
        url: `${variables.FRONTEND_PROTOCOL}://${variables.FRONTEND_HOST}:${variables.FRONTEND_PORT}`
    },
    github: {
        webhooksSecret: variables.GITHUB_WEBHOOKS_SECRET,
        appId: variables.GITHUB_APP_ID,
        appPrivateKey: variables.GITHUB_APP_PRIVATE_KEY,
        clientId: variables.GITHUB_CLIENT_ID,
        clientSecret: variables.GITHUB_CLIENT_SECRET,
    },
    encryptionSecret: variables.ENCRYPTION_SECRET,
};

export {
    config,
    secrets,
};