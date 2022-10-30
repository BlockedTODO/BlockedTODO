import {Repository} from '../db/index.js';
import {logger} from '../utils/index.js';
import scanGithubRepository from '../github/scanGithubRepository.js';

const scanRepositories = async () => {
    const repositories = await Repository.query();

    for (const repository of repositories) {
        await scanGithubRepository(repository);
    }

    return 'success';
};

const onSuccess = (result) => {
    logger.info({result});
    process.exit(0); // Success exit code
};

const onError = (error) => {
    logger.error({error});
    process.exit(1); // Error exit code
};

// Run code synchronously to ensure proper process error codes are returned.
scanRepositories().then(onSuccess).catch(onError);
