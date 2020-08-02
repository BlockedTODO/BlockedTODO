const {transactionPerTest} = require('objection-transactional-tests');
const {knex, Issue, Repository, Task} = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
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
