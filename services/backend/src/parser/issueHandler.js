const {Issue} = require('db/models');

/* Delete issues that are no longer mentioned in the codebase from the repository */
const deleteUnreferencedIssues = async (repository, referencedIssues) => {
    const issues = await repository.$relatedQuery('issues');
    for (const issue of issues) {
        if (issue.url in referencedIssues) {
            continue;
        }

        await issue.$query().delete();
    }
};

/* Add missing issues to the database.
 * Takes a list of issue urls and creates them if they don't exist. */
const createMissingIssues = async (repository, referencedIssueUrls) => {
    const handleIssue = async (issueUrl) => {
        const issue = await Issue.query().findOrInsert({url: issueUrl, repositoryId: repository.id});

        return issue;
    };

    return await Promise.allSettled(referencedIssueUrls.map(handleIssue));
};

module.exports = {
    deleteUnreferencedIssues,
    createMissingIssues,
};
