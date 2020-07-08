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

describe('findOrCreate', () => {
    it('creates a new instance', async () => {
        const preIssueCount = await Issue.query().resultSize();
        const issue = await findOrCreate(Issue, {url: 'http://example.com'});
        const postIssueCount = await Issue.query().resultSize();

        expect(postIssueCount).toEqual(preIssueCount + 1);
        expect(issue).not.toBeNull();
    });

    it('does not create a new instance when an instance exists', async () => {
        const issue1 = await Issue.query().insert({url: 'http://example.com'});

        const preIssueCount = await Issue.query().resultSize();
        const issue2 = await findOrCreate(Issue, {url: 'http://example.com'});
        const postIssueCount = await Issue.query().resultSize();

        expect(postIssueCount).toEqual(preIssueCount);
        expect(issue1.id).toEqual(issue2.id);
    });

    it('calls the afterCreate callback', async () => {
        const callback = jest.fn();
        await findOrCreate(Issue, {url: 'http://example.com'}, callback);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('can add a relation in the callback', async () => {
        const repository = await Repository.query().insert({host: 'github', hostId: 'abc123'});
        await findOrCreate(Issue, {url: 'http://example.com'}, async (issue) => {
            await issue.$relatedQuery('repositories').relate(repository);
        });

        const issue = await Issue.query().findOne({url: 'http://example.com'}).withGraphFetched('repositories');
        expect(issue.repositories[0].id).toEqual(repository.id);
    });

    it('does not call the afterCreate callback when an instance exists', async () => {
        await Issue.query().insert({url: 'http://example.com'});

        const callback = jest.fn();
        await findOrCreate(Issue, {url: 'http://example.com'}, callback);

        expect(callback).toHaveBeenCalledTimes(0);
    });
});
