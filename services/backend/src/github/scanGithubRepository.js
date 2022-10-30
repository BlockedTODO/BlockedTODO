import {temporaryDirectoryTask} from 'tempy';
import {logger} from '../utils/index.js';
import {createInstallationClient, downloadRepository} from './utils/index.js';
import {scanCodebase} from '../parser/index.js';

const scanGithubRepository = async (repository) => {
    const githubClient = await createInstallationClient(repository.installationId);

    await temporaryDirectoryTask(async (tempDir) => {
        logger.info('Downloading GitHub repository', {repository});
        const codeFolder = await downloadRepository(githubClient, repository.nodeId, tempDir);
        logger.info(`Repository successfully downloaded into ${codeFolder}`, {repository});

        logger.info('Beginning codebase scan', {repository});
        await scanCodebase(codeFolder, repository, githubClient);
        logger.info('Repository scan completed', {repository});
    });
};

export default scanGithubRepository;
