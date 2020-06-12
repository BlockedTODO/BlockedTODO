const {Issue} = require('db/models');
const {findOrCreate} = require('db/utils/');

/* Unrelate issues that are no longer mentioned in the codebase from the repository.
 * Delete the issue if the issue is no longer referenced by any repositories. */
const deleteUnreferencedIssues = async (repository, referencedIssues) => {
    const issues = await repository.$relatedQuery('issues');
    for (let issue of issues) {
        if (issue.url in referencedIssues) {
            continue;
        }

        await Issue.transaction(async (_tx) => {
            /* By making this code atomic via a transaction, we avoid race conditions that may
             * occur between the check for issue.repositories.length and the issue deletion. */
            await issue.$relatedQuery('repositories').unrelate().where({repositoryId: repository.id});

            issue = await issue.$query().withGraphFetched('repositories');
            if (issue.repositories.length === 0) {
                await issue.$query().delete();
            }
        });
    }
};

/* Add missing issues to the database.
 * Takes a list of issue urls and creates them if they don't exist. */
const createMissingIssues = async (repository, referencedIssueUrls) => {
    return await Promise.allSettled(referencedIssueUrls.map((issueUrl) => {
        return findOrCreate(Issue, {url: issueUrl}, async (issue) => {
            await issue.$relatedQuery('repositories').relate(repository);
        });
    }));
};

module.exports = {
    deleteUnreferencedIssues,
    createMissingIssues,
};
