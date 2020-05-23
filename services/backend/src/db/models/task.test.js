const {transactionPerTest} = require('objection-transactional-tests');
const Task = require('./task');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

describe('insert', () => {
    it('is given an id automatically', async () => {
        const task = await Task.query().insertGraph({
            url: 'http://example.com',
            repository: {url: 'http://example.com'},
            issue: {url: 'http://example.com'}
        }, {relate: ['repository', 'issue']});

        expect(task).toHaveProperty('id');
        expect(task.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const task = await Task.query().insertGraph({
            url: 'http://example.com',
            repository: {url: 'http://example.com'},
            issue: {url: 'http://example.com'}
        }, {relate: ['repository', 'issue']});

        expect(task).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('normalizes urls before insertion', async () => {
        const url = 'github.com/user?b=1&a=0';
        const normalizedUrl = 'http://github.com/user?a=0&b=1';
        const task = await Task.query().insertGraph({
            url: url,
            repository: {url: 'http://example.com'},
            issue: {url: 'http://example.com'}
        }, {relate: ['repository', 'issue']});

        expect(task.url).toEqual(normalizedUrl);
    });

    it('rejects an empty url', async () => {
        const insertQuery = Task.query().insertGraph({
            url: '',
            repository: {url: 'http://example.com'},
            issue: {url: 'http://example.com'}
        }, {relate: ['repository', 'issue']});

        await expect(insertQuery).rejects.toThrowError();
    });
});
