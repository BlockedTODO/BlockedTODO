const {Repository} = require('db/');
const {logger} = require('utils/');
const scanGitHubRepository = require('github/scanGitHubRepository');

const scanRepositories = async () => {
    const repositories = await Repository.query();

    for (const repository of repositories) {
        await scanGitHubRepository(repository);
    }

    return 'success';
};

const onSuccess = (result) => {
    logger.info(result);
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error(error.message);
    process.exit(1); // Error exit code
};

// Run code synchronously to ensure proper process error codes are returned.
scanRepositories().then(onSuccess).catch(onError);
