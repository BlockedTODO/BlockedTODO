const stringifyObject = require('stringify-object');
const {logger} = require('utils/');
const parseCodebase = require('./parseCodebase');
const {deleteUnreferencedIssues, createMissingIssues} = require('./issueHandler');
const {createMissingTasks} = require('./taskHandler');

/* Perform a complete scan of a codebase. */
const scanCodebase = async (codeFolder, repository, githubClient) => {
    logger.info(`Gathering list of referenced issues for ${repository.id}`);
    const referencedIssues = await parseCodebase(codeFolder);
    logger.info(`Referenced issues in repo ${repository.id}: ${stringifyObject(referencedIssues)}`);

    // Get repository and log its related issues
    repository = await repository.$query().withGraphFetched('issues');

    logger.info(`Deleting unreferenced issues in ${stringifyObject(repository)}`);
    await deleteUnreferencedIssues(repository, referencedIssues);

    // Refresh repository so that deleted issues are removed
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    logger.info(`Creating missing issues in repo ${repository.id}`);
    await createMissingIssues(repository, Object.keys(referencedIssues));
    logger.info(`Missing issues created for repo ${repository.id}`);

    // Refresh repository so that created issues are included
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    // Create tasks
    logger.info(`Creating missing tasks in repo ${repository.id}`);
    await createMissingTasks(repository, githubClient, referencedIssues);
    logger.info(`Missing tasks created for repo ${repository.id}`);
};

module.exports = scanCodebase;
