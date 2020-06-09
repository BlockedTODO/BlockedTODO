const tempy = require('tempy');
const {promises: fsPromises} = require('fs');
const parseCodebase = require('parser');
const logger = require('utils/logger');
const {createAppClient, downloadRepository} = require('github/utils/');

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

    // Delete temp folder
    await fsPromises.unlink(destination);
};

module.exports = {onPush};
