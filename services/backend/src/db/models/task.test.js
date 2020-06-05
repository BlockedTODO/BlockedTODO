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
    const validTaskRelations = {
        repository: {host: 'github', hostId: 'abc123'},
        issue: {url: 'http://example.com'},
    };

    it('is given an id automatically', async () => {
        const task = await Task.query().insertGraph({
            host: 'github',
            hostId: 'abc123',
            ...validTaskRelations,
        }, {relate: ['repository', 'issue']});

        expect(task).toHaveProperty('id');
        expect(task.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const task = await Task.query().insertGraph({
            host: 'github',
            hostId: 'abc123',
            ...validTaskRelations,
        }, {relate: ['repository', 'issue']});

        expect(task).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('rejects an empty host', async () => {
        const insertQuery = Task.query().insertGraph({
            host: '',
            hostId: 'abc123',
            ...validTaskRelations,
        }, {relate: ['repository', 'issue']});

        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an unsupported host', async () => {
        const insertQuery = Task.query().insertGraph({
            host: 'bitbucket',
            hostId: 'abc123',
            ...validTaskRelations,
        }, {relate: ['repository', 'issue']});

        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty host id', async () => {
        const insertQuery = Task.query().insertGraph({
            host: 'github',
            hostId: '',
            ...validTaskRelations,
        }, {relate: ['repository', 'issue']});

        await expect(insertQuery).rejects.toThrowError();
    });
});
