import objection from 'objection';
import {config} from '../../utils/index.js';

const {knexSnakeCaseMappers} = objection;
const {name: database, user, password, host, port} = config.database;

const knexConfig = {
    development: {
        client: 'postgresql',
        connection: {database, user, password, host, port},
        pool: {min: 2, max: 16},
        migrations: {directory: '../migrations'},
        seeds: {directory: '../seeds'},
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    },
    test: {
        client: 'postgresql',
        connection: {database, user, password, host, port},
        pool: {min: 2, max: 16},
        migrations: {directory: '../migrations'},
        seeds: {directory: '../seeds'},
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    },
    production: {
        client: 'postgresql',
        connection: {database, user, password, host, port},
        pool: {min: 2, max: 16},
        migrations: {directory: '../migrations'},
        seeds: {directory: '../seeds'},
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    }
};

export default knexConfig;
