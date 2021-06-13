import objection from 'objection';
import knex from './src/db/index.js';

const {transaction, Model} = objection;

global.beforeAll(async () => {
    global.knex = knex;
    global.txn = null;
});

global.beforeEach(async () => {
    global.txn = await transaction.start(knex);
    Model.knex(global.txn);
});

global.afterEach(async () => {
    await global.txn.rollback();
    Model.knex(knex);
});

global.afterAll(async () => {
    global.knex.destroy();
});
