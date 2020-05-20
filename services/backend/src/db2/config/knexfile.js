module.exports = {
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
        }
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
        }
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
        }
    }
}
