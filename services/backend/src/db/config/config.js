// Using js config instead of json so that I can use separate environment variables
// As per examples on https://github.com/sequelize/cli/issues/77
require('dotenv').config();

module.exports = {
    development: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres',
        define: {
            underscored: false,
            freezeTableName: true,
        },
        benchmark: true,
    },
    test: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres',
        define: {
            underscored: false,
            freezeTableName: true,
        },
        benchmark: true,
    },
    production: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres',
        define: {
            underscored: false,
            freezeTableName: true,
        },
        benchmark: true,
    },
}
