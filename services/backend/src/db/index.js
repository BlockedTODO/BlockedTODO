/* BlockedTODO: https://github.com/knex/knex/issues/3866
 * Upgrade knex and use absolute imports all over the db/ folder once it's closed */
import {Model} from 'objection';
import Knex from 'knex';
import knexConfig from './config/knexfile.js';
import {logger} from '../utils/index.js';

export * from './models/index.js'; // Export all models

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);
knex.on('query', (data) => logger.info(`${data.sql} -- Bindings: ${data.bindings}`));

// Bind all Models to a knex instance.
Model.knex(knex);

export default knex;
