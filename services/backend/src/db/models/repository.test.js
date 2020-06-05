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
    it('is given an id automatically', async () => {
        const repository = await Repository.query().insert({host: 'github', hostId: 'abc123'});
        expect(repository).toHaveProperty('id');
        expect(repository.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const repository = await Repository.query().insert({host: 'github', hostId: 'abc123'});
        expect(repository).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('rejects an empty host', async () => {
        const insertQuery = Repository.query().insert({host: '', hostId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an unsupported host', async () => {
        const insertQuery = Repository.query().insert({host: 'bitbucket', hostId: 'abc123'});
        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty host id', async () => {
        const insertQuery = Repository.query().insert({host: 'github', hostId: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
