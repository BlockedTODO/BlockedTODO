const {logger, withTempDirectory} = require('utils/');
const {createInstallationClient, downloadRepository} = require('github/utils/');
const {scanCodebase} = require('parser/');

const scanGitHubRepository = async (repository) => {
    const githubClient = await createInstallationClient(repository.installationId);

    await withTempDirectory(async (tempDir) => {
        logger.info(`Downloading GitHub repository ${repository.id}`);
        const codeFolder = await downloadRepository(githubClient, repository.hostId, tempDir);
        logger.info(`Repository ${repository.id} successfully downloaded into ${codeFolder}`);

        logger.info(`Beginning codebase scan on repository ${repository.id}`);
        await scanCodebase(codeFolder, repository, githubClient);
        logger.info(`Repository ${repository.id} scan completed`);
    });
};

module.exports = scanGitHubRepository;
