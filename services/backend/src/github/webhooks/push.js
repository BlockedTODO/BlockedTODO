const tempy = require('tempy');
const {promises: fsPromises} = require('fs');
const {URL} = require('url');
const parseCodebase = require('parser');
const {logger} = require('utils/');
const {createAppClient, downloadRepository, getIssue} = require('github/utils/');
const {Issue, Repository, Task} = require('db/models');
const {findOrCreate} = require('db/utils/');

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

    // Add missing issues to the database
    Promise.allSettled(Object.keys(referencedIssues).map((issueUrl) => {
        return findOrCreate(Issue, {url: issueUrl}, async (issue) => {
            await issue.$relatedQuery('repositories').relate(repository);
        });
    }));

    // Refresh repository so that created issues are included
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    for (const issue of repository.issues) {
        const issueUrl = new URL(issue.url);
        if (issueUrl.hostname !== 'github.com') {
            logger.info(`Unsupported issue host: ${issueUrl.hostname} for ${issue.url}`);
            continue;
        }

        let task = await Task.query().findOne({repositoryId: repository.id, issueId: issue.id});
        if (task) {
            logger.info(`task ${task.id} already exists for issue ${issue.id} on repository ${repository.id}`);
            continue;
        }

        const {title, closed} = await getIssue(githubClient, issue);
        if (!closed) {
            logger.info(`issue ${issue.id} is still open`);
            continue;
        }

        // Create task (GitHub issue)

        // Create task in database
    }

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
