require('db/'); // Initiate database connection
const {Repository} = require('db/models/');
const {logger, withTempDirectory} = require('utils/');
const {createInstallationClient, downloadRepository} = require('github/utils/');
const {scanCodebase} = require('parser/');

const scanRepositories = async () => {
    const repositories = await Repository.query();

    for (const repository of repositories) {
        const githubClient = await createInstallationClient(repository.installationId);

        await withTempDirectory(async (tempDir) => {
            logger.info(`Downloading GitHub repository ${repository.id}`);
            const codeFolder = await downloadRepository(githubClient, repository.hostId, tempDir);
            logger.info(`Repository ${repository.id} successfully downloaded into ${codeFolder}`);

            logger.info(`Beginning codebase scan on repository ${repository.id}`);
            await scanCodebase(codeFolder, repository, githubClient);
            logger.info(`Repository ${repository.id} scan completed`);
        });
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
