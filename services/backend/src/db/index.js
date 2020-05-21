const {Model} = require('objection');
const Knex = require('knex');
const knexConfig = require('db/config/knexfile');
const logger = require('utils/logger');

const environment = process.env.NODE_ENV || 'development';

const db = Knex(knexConfig[environment]);
db.on('query', (data) => logger.info(`${data.sql} -- Bindings: ${data.bindings}`));

// Bind all Models to a knex instance.
Model.knex(db);

module.exports = db;
