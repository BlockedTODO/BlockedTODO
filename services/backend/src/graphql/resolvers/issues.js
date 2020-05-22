const {findOrCreate} = require('db/utils/');

const issueQueries = {
    issues: (parent, args, {Issue}, info) => Issue.query()
};

const issueMutations = {
    createIssue: async (parent, {issueInput}, {Issue, Repository}, info) => {
        const repository = await Repository.findByPk(issueInput.repositoryId);

        return await Issue.transaction(async (_tx) => {
            const issue = await findOrCreate(Issue, issueInput);
            await issue.$relatedQuery('repositories').relate(repository);
            return issue;
        });
    }
};

module.exports = {
    issueQueries,
    issueMutations,
};
