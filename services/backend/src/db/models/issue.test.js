const {transactionPerTest} = require('objection-transactional-tests');
const {knex, Issue, Repository} = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    knex.destroy();
});

const validIssueData = async () => {
    const repository = await Repository.query().insert({nodeId: 'abc123', installationId: 123});
    return {url: 'http://example.com', repositoryId: repository.id};
};

describe('insert', () => {
    it('rejects an empty url', async () => {
        const insertQuery = Issue.query().insert({...await validIssueData(), url: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
