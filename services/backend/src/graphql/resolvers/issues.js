export const issueQueries = {
    issues: (parent, args, {Issue}, info) => Issue.query()
};

export const issueMutations = {
    createIssue: async (parent, {issueInput}, {Issue}, info) => {
        return await Issue.query().insert(issueInput);
    }
};
