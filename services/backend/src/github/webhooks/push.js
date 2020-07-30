const {Repository} = require('db/');
const {logger} = require('utils/');
const scanGitHubRepository = require('github/scanGitHubRepository');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/).groups.branchName;

    if (branch !== defaultBranch) {
        logger.info('Not on the default branch, skipping repo scan');
        return;
    }

    const repository = await Repository.query().findOne({hostId: payload.repository.node_id});

    await scanGitHubRepository(repository);
};

module.exports = {onPush};
