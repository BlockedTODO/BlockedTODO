const {transactionPerTest} = require('objection-transactional-tests');
const findOrCreate = require('./findOrCreate');
const db = require('db/');
const {Issue, Repository} = require('db/models/');

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

describe('findOrCreate', () => {
    it('creates a new instance', async () => {
        const preIssueCount = await Issue.query().resultSize();
        const issue = await findOrCreate(Issue, await validIssueData());
        const postIssueCount = await Issue.query().resultSize();

        expect(postIssueCount).toEqual(preIssueCount + 1);
        expect(issue).not.toBeNull();
    });

    it('does not create a new instance when an instance exists', async () => {
        const issueData = await validIssueData();
        const issue1 = await Issue.query().insert(issueData);

        const preIssueCount = await Issue.query().resultSize();
        const issue2 = await findOrCreate(Issue, issueData);
        const postIssueCount = await Issue.query().resultSize();

        expect(postIssueCount).toEqual(preIssueCount);
        expect(issue1.id).toEqual(issue2.id);
    });

    it('calls the afterCreate callback', async () => {
        const callback = jest.fn();
        await findOrCreate(Issue, await validIssueData(), callback);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('can add a relation in the callback', async () => {
        const issueData = await validIssueData();
        const repository = await Repository.query().insert({host: 'github', hostId: 'def456'});
        const issue = await findOrCreate(Issue, issueData, async (issue) => {
            await issue.$relatedQuery('repository').relate(repository);
        });

        const issueRepository = await issue.$relatedQuery('repository');
        expect(issueRepository.id).toEqual(repository.id);
    });

    it('does not call the afterCreate callback when an instance exists', async () => {
        const issueData = await validIssueData();
        await Issue.query().insert(issueData);

        const callback = jest.fn();
        await findOrCreate(Issue, issueData, callback);

        expect(callback).toHaveBeenCalledTimes(0);
    });
});
