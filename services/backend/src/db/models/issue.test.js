const {transactionPerTest} = require('objection-transactional-tests');
const Issue = require('./issue');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

describe('insert', () => {
    it('is given an id automatically', async () => {
        const issue = await Issue.query().insert({url: 'http://example.com'});
        expect(issue).toHaveProperty('id');
        expect(issue.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const issue = await Issue.query().insert({url: 'http://example.com'});
        expect(issue).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('normalizes urls before insertion', async () => {
        const url = 'github.com/user?b=1&a=0';
        const normalizedUrl = 'http://github.com/user?a=0&b=1';

        const issue = await Issue.query().insert({url: url});
        expect(issue.url).toEqual(normalizedUrl);
    });

    it('rejects an empty url', async () => {
        const insertQuery = Issue.query().insert({url: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
