const {transactionPerTest} = require('objection-transactional-tests');
const Repository = require('./repository');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

describe('insert', () => {
    it('rejects an empty host', async () => {
        const insertQuery = Repository.query().insert({host: '', hostId: 'abc123', installationId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an unsupported host', async () => {
        const insertQuery = Repository.query().insert({host: 'bitbucket', hostId: 'abc123', installationId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty host id', async () => {
        const insertQuery = Repository.query().insert({host: 'github', hostId: '', installationId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty installation id', async () => {
        const insertQuery = Repository.query().insert({host: 'github', hostId: 'abc123', installationId: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
