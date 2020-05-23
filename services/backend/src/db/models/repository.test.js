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
        const repository = await Repository.query().insert({url: 'http://example.com'});
        expect(repository).toHaveProperty('id');
        expect(repository.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const repository = await Repository.query().insert({url: 'http://example.com'});
        expect(repository).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('normalizes urls before insertion', async () => {
        const url = 'github.com/user?b=1&a=0';
        const normalizedUrl = 'http://github.com/user?a=0&b=1';

        const repository = await Repository.query().insert({url: url});
        expect(repository.url).toEqual(normalizedUrl);
    });

    it('rejects an empty url', async () => {
        const insertQuery = Repository.query().insert({url: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
