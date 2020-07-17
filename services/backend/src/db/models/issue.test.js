const {transactionPerTest} = require('objection-transactional-tests');
const {Issue, Repository} = require('db/models/');
const db = require('db/');

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

const validIssueData = async () => {
    const repository = await Repository.query().insert({host: 'github', hostId: 'abc123'});
    return {url: 'http://example.com', repositoryId: repository.id};
};

describe('insert', () => {
    it('is given an id automatically', async () => {
        const issue = await Issue.query().insert(await validIssueData());
        expect(issue).toHaveProperty('id');
        expect(issue.id).not.toBeNull();
    });

    it('sets createdAt and updatedAt automatically', async () => {
        const issue = await Issue.query().insert(await validIssueData());
        expect(issue).toMatchObject({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    it('normalizes urls before insertion', async () => {
        const url = 'github.com/user?b=1&a=0';
        const normalizedUrl = 'http://github.com/user?a=0&b=1';

        const issue = await Issue.query().insert({...await validIssueData(), url: url});
        expect(issue.url).toEqual(normalizedUrl);
    });

    it('rejects an empty url', async () => {
        const insertQuery = Issue.query().insert({...await validIssueData(), url: ''});
        await expect(insertQuery).rejects.toThrowError();
    });
});
