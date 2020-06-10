const tempy = require('tempy');
const {promises: fsPromises} = require('fs');
const parseCodebase = require('parser');
const logger = require('utils/logger');
const {createAppClient, downloadRepository} = require('github/utils/');
const {Issue, Repository} = require('db/models');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        logger.info('Not on the default branch, skipping repo scan');
        return;
    }

    const githubClient = await createAppClient(payload.installation.id);
    const repositoryId = payload.repository.node_id;

    const destination = tempy.directory();
    const codeFolder = await downloadRepository(githubClient, repositoryId, destination);

    const referencedIssues = await parseCodebase(codeFolder);
    logger.info(referencedIssues);

    // Get repository and log its related issues
    let repository = await Repository.query().findOne({hostId: repositoryId}).withGraphFetched('issues');
    logger.info(repository);

    await deleteUnreferencedIssues(repository, referencedIssues);

    // Refresh repository so that deleted issues are removed
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    // Delete temp folder
    await fsPromises.rmdir(destination, {recursive: true});
};

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

module.exports = {onPush};
