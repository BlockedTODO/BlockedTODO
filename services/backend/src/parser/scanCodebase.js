const {Repository} = require('db/models');
const {logger} = require('utils/');
const parseCodebase = require('./parseCodebase');
const {deleteUnreferencedIssues, createMissingIssues} = require('./issueHandler');
const {createMissingTasks} = require('./taskHandler');

/* Perform a complete scan of a codebase. */
const scanCodebase = async (codeFolder, repositoryHostId, githubClient) => {
    console.dir(require('parser/'));
    const referencedIssues = await parseCodebase(codeFolder);
    logger.info(referencedIssues);

    // Get repository and log its related issues
    let repository = await Repository.query().findOne({hostId: repositoryHostId}).withGraphFetched('issues');
    logger.info(repository);

    await deleteUnreferencedIssues(repository, referencedIssues);

    // Refresh repository so that deleted issues are removed
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    await createMissingIssues(repository, Object.keys(referencedIssues));

    // Refresh repository so that created issues are included
    repository = await repository.$query().withGraphFetched('issues');
    logger.info(repository);

    // Create tasks
    await createMissingTasks(repository, githubClient, referencedIssues);
}

module.exports = scanCodebase;
