const {Repository} = require('db/');
const {logger} = require('utils/');
const scanGithubRepository = require('github/scanGithubRepository');

const onPush = async ({payload}) => {
    const defaultBranch = payload.repository.default_branch;
    const branchMatch = payload.ref.match(/refs\/heads\/(?<branchName>.*)/);

    if (!branchMatch) {
        logger.info('Not a push to a branch, skipping repo scan');
        return;
    }

    const branch = branchMatch.groups.branchName;

    if (branch !== defaultBranch) {
        logger.info('Not on the default branch, skipping repo scan');
        return;
    }

    const repository = await Repository.query().findOne({nodeId: payload.repository.node_id});

    await scanGithubRepository(repository);
};

module.exports = {onPush};
