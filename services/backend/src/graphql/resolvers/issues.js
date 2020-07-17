const issueQueries = {
    issues: (parent, args, {Issue}, info) => Issue.query()
};

const issueMutations = {
    createIssue: async (parent, {issueInput}, {Issue}, info) => {
        return await Issue.query().insert(issueInput);
    }
};

module.exports = {
    issueQueries,
    issueMutations,
};
