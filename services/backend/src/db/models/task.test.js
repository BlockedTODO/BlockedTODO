const {transactionPerTest} = require('objection-transactional-tests');
const {Issue, Repository, Task} = require('db/models/');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

const validTaskData = async () => {
    const repository = await Repository.query().insert({host: 'github', hostId: 'abc123', installationId: 'abc123'});
    const issue = await Issue.query().insert({url: 'http://example.com', repositoryId: repository.id});

    return {
        host: 'github',
        hostId: 'abc123',
        repositoryId: repository.id,
        issueId: issue.id,
    };
};

describe('insert', () => {
    it('is given an id automatically', async () => {
        const task = await Task.query().insert(await validTaskData());

        expect(task).toHaveProperty('id');
        expect(task.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const task = await Task.query().insert(await validTaskData());

        expect(task).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('rejects an empty host', async () => {
        const insertQuery = Task.query().insert({...await validTaskData(), host: ''});

        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an unsupported host', async () => {
        const insertQuery = Task.query().insertGraph({...await validTaskData(), host: 'bitbucket'});

        await expect(insertQuery).rejects.toThrowError();
    });

    it('rejects an empty host id', async () => {
        const insertQuery = Task.query().insertGraph({...await validTaskData(), hostId: ''});

        await expect(insertQuery).rejects.toThrowError();
    });
});
