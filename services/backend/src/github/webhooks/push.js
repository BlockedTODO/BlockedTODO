const {logger} = require('utils/');
const {createAppClient, downloadAndScan} = require('github/utils/');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        logger.info('Not on the default branch, skipping repo scan');
        return;
    }

    const githubClient = await createAppClient(payload.installation.id);
    const repositoryHostId = payload.repository.node_id;

    await downloadAndScan(githubClient, repositoryHostId);
};

module.exports = {onPush};
