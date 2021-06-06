import tempy from 'tempy';
import {logger} from '../utils/index.js';
import {createInstallationClient, downloadRepository} from './utils/index.js';
import {scanCodebase} from '../parser/index.js';

const scanGithubRepository = async (repository) => {
    const githubClient = await createInstallationClient(repository.installationId);

    await tempy.directory.task(async (tempDir) => {
        logger.info(`Downloading GitHub repository ${repository.id}`);
        const codeFolder = await downloadRepository(githubClient, repository.nodeId, tempDir);
        logger.info(`Repository ${repository.id} successfully downloaded into ${codeFolder}`);

        logger.info(`Beginning codebase scan on repository ${repository.id}`);
        await scanCodebase(codeFolder, repository, githubClient);
        logger.info(`Repository ${repository.id} scan completed`);
    });
};

export default scanGithubRepository;
