import {transactionPerTest} from 'objection-transactional-tests';
import knex, {Issue, Repository} from '../index.js';

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
