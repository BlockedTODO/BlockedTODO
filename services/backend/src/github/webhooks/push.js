const {Repository} = require('db/models');
const {logger, withTempDirectory} = require('utils/');
const {createAppClient, downloadRepository} = require('github/utils/');
const {scanCodebase} = require('parser/');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        logger.info('Not on the default branch, skipping repo scan');
        return;
    }

    const githubClient = await createAppClient(payload.installation.id);

    const repositoryHostId = payload.repository.node_id;
    const repository = await Repository.query().findOne({hostId: repositoryHostId});

    await withTempDirectory(async (tempDir) => {
        logger.info(`Downloading GitHub repository ${repository.id}`);
        const codeFolder = await downloadRepository(githubClient, repository.hostId, tempDir);
        logger.info(`Repository ${repository.id} successfully downloaded into ${codeFolder}`);

        logger.info(`Beginning codebase scan on repository ${repository.id}`);
        await scanCodebase(codeFolder, repository, githubClient);
        logger.info(`Repository ${repository.id} scan completed`);
    });
};

module.exports = {onPush};
