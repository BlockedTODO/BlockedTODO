const {transactionPerTest} = require('objection-transactional-tests');
const {knex, Issue, Repository, Task} = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
});

const validTaskData = async () => {
    const repository = await Repository.query().insert({nodeId: 'abc123', installationId: 123});
    const issue = await Issue.query().insert({url: 'http://example.com', repositoryId: repository.id});

    return {
        nodeId: 'abc123',
        repositoryId: repository.id,
        issueId: issue.id,
    };
};

describe('insert', () => {
    it('rejects an empty node id', async () => {
        const insertQuery = Task.query().insertGraph({...await validTaskData(), nodeId: ''});

        await expect(insertQuery).rejects.toThrowError();
    });
});
