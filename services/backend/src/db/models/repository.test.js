const {transactionPerTest} = require('objection-transactional-tests');
const {knex, Repository} = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
});

describe('insert', () => {
    it('rejects an empty node id', async () => {
        const insertQuery = Repository.query().insert({nodeId: '', installationId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty installation id', async () => {
        const insertQuery = Repository.query().insert({nodeId: 'abc123', installationId: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
