/* BlockedTODO: https://github.com/knex/knex/issues/3866
 * Upgrade knex and use absolute imports all over the db/ folder once it's closed */
const {Model} = require('objection');
const Knex = require('knex');
const knexConfig = require('./config/knexfile');
const logger = require('../utils/logger');
const models = require('./models');

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);
knex.on('query', (data) => logger.info(`${data.sql} -- Bindings: ${data.bindings}`));

// Bind all Models to a knex instance.
Model.knex(knex);

module.exports = {
    knex,
    ...models,
};
