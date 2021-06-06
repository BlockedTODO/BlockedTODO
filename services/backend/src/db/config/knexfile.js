import objection from 'objection';

const {knexSnakeCaseMappers} = objection;

const knexConfig = {
    development: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
        },
        pool: {
            min: 2,
            max: 16
        },
        migrations: {
            directory: '../migrations'
        },
        seeds: {
            directory: '../seeds'
        },
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    },
    test: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
        },
        pool: {
            min: 2,
            max: 16
        },
        migrations: {
            directory: '../migrations'
        },
        seeds: {
            directory: '../seeds'
        },
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    },
    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
        },
        pool: {
            min: 2,
            max: 16
        },
        migrations: {
            directory: '../migrations'
        },
        seeds: {
            directory: '../seeds'
        },
        /* Set postgres column names as snake_case, but return objects with camelCase
         * Each query written in JavaScript must be written with camelCase.
         * The conversion to snake_case will happen automatically. */
        ...knexSnakeCaseMappers(),
    }
};

export default knexConfig;
