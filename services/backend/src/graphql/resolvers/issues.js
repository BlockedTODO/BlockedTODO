const issueQueries = {
    issues: (parent, args, {Issue}, info) => Issue.query()
};

const issueMutations = {
    createIssue: async (parent, {issueInput}, {Issue, Repository}, info) => {
        const repository = await Repository.findByPk(issueInput.repositoryId);

        const issue = await Issue.transaction(async (_tx) => { // find or create
            let issue = await Issue.query().findOne({url: issueInput.url});

            if (issue) { // issue is found, return it
                return issue;
            }

            try { // issue is not found, try to create it
                issue = await Issue.query().insert({url: issueInput.url});
                issue.$relatedQuery('repositories').relate(repository);
            } catch (error) {
                if (error.name && error.name === 'UniqueViolationError') { // in case there was a race condition
                    issue = await Issue.query().findOne({url: issueInput.url});
                }
            }

            return issue;
        });

        return issue;
    }
};

module.exports = {
    issueQueries,
    issueMutations,
};
