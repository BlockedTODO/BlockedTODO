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

    await withTempDirectory(async (tempDir) => {
        const codeFolder = await downloadRepository(githubClient, repositoryHostId, tempDir);
        await scanCodebase(codeFolder, repositoryHostId, githubClient);
    });
};

module.exports = {onPush};
